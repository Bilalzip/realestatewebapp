import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import slugify from "slugify";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

connect();


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text,
        });
        return response.data[0].embedding;
    } catch (error: any) {
        console.error("Error generating embedding:", error);
        throw new Error("Failed to generate text embedding");
    }
}

export async function POST(request: NextRequest) {
    try {
        const ReqBody = await request.json();
        const { name, streetaddress, pincode, landmark, description, price, bedrooms, bathrooms, state, features } = ReqBody;
        if (!name || !description || !state || !price) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        const embeddingText = `
            Name: ${name}
            Address: ${streetaddress}, ${pincode}
            Landmark: ${landmark}
            State: ${state}
            Description: ${description}
            Price: ${price} USD
            Bedrooms: ${bedrooms}, Bathrooms: ${bathrooms}
            Features: ${features ? features.join(", ") : "None"}
        `.trim();
        const embedding = await generateEmbedding(embeddingText);
        
        console.log(embedding);

        const property = new Property({
            name,
            state,
            streetaddress,
            pincode,
            slug: slugify(name),
            price,
            bedrooms,
            bathrooms,
            landmark,
            description,
            features,
            embedding, // Store the improved vector representation
        });

        await property.save();

        return NextResponse.json({
            success: true,
            message: "Property listing has been saved with an enhanced vector embedding",
            data: property,
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const properties = await Property.find({}).limit(20);
        return NextResponse.json({
            success: true,
            message: "Properties fetched successfully",
            data: properties,
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
