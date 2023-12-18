// pages/api/admin/listimage.ts
import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const ReqBody = await request.json();
    const { propertyId, imgarray } = ReqBody;

    // Update the property with the given propertyId to include the new images
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $push: { imgarray: { $each: imgarray } } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Images have been associated with the property",
      property: updatedProperty,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
