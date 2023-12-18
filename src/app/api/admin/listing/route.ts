import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import mongoose from "mongoose";
import slugify from "slugify";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";
connect()

export async function POST(request: NextRequest, response: NextResponse) {
        try {
            const ReqBody = await request.json();
            const { name, streetaddress, pincode, landmark,description, price , bedrooms, bathrooms} = ReqBody;
            console.log(bedrooms,bathrooms)
              const save = await new Property({
                description,
                name,
                streetaddress,
                pincode,
                slug:slugify(name),price , bedrooms, bathrooms,
                landmark}).save();
              return NextResponse.json({
                success: true,
                message: "Basic information has been saved",
                save,
              });
            
          } catch (error: any) {
            return NextResponse.json({ error: error.message });
          }
  }
  

  export async function GET(request: NextRequest, response: NextResponse,) {
        try {
            const property = await Property.find({});
            return NextResponse.json({
                success: true,
                message: "Basic information has been fetched",
                property,
              });
            
          } catch (error: any) {
            return NextResponse.json({ error: error.message });
          }
  }