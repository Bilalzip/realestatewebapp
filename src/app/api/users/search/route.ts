import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const Reqdata = await request.json();
    const { data } = Reqdata;
    console.log(data);

    const properties = await Property.aggregate([
      {
        $search: {
          index: "search",
          text: {
            query: data,
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ]);

    console.log(properties);

    return NextResponse.json({ properties });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
