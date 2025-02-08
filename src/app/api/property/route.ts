import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";

connect();

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(request: NextRequest) {
  try {
    const ReqBody = await request.json();
    const { slug, id, query } = ReqBody;
    
    console.log("Incoming Request:", { slug, id, query });

    // Fetch favorite properties by ID
    if (id && !slug) {
      const favorites = await Property.find({ _id: { $in: id } });
      return NextResponse.json({ success: true, favorites });
    }

    // Handle vector search
    if (query) {
      return await searchProperties(query);
    }

    // Fetch single property by slug
    const property = await Property.findOne({ slug });

    if (!property) {
      return NextResponse.json({ success: false, message: "No property found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property });

  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

async function searchProperties(query: string) {
  try {
    // Generate vector embedding for query text
    const queryVector = await embeddings.embedQuery(query);
    console.log("Generated Query Vector:", queryVector);

    // Perform vector search in MongoDB Atlas
    const matchedProperties = await Property.aggregate([
      {
        $vectorSearch: {
          index: "similarsearch", // Ensure this matches your MongoDB Atlas index name
          path: "embedding",
          queryVector: queryVector,
          numCandidates: 100, // Increase for better accuracy
          limit: 5, // Number of top results to return
          similarity: "cosine", // Ensure consistent similarity metric
        },
      } as any, // Fix TypeScript issue
    ]);
    
    console.log("Matched Properties:", matchedProperties);
    
    return NextResponse.json({ success: true, properties: matchedProperties });

  } catch (error: any) {
    console.error("Error in Vector Search:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
