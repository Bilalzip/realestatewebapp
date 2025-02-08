import { NextRequest, NextResponse } from "next/server";

import Property from "@/models/Property";
export async function POST(req: NextRequest, res: NextResponse) {

    const reqBody = await req.json();

    const { id } = reqBody;

    if (!id) {
        return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }
    
    try {
        const property = await Property.findByIdAndDelete(id);
        console.log(property)
        return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });

    }
}
