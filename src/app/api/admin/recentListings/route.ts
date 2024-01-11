import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest, res: NextResponse){

    try {
        const response= await Property.find({});
        return NextResponse.json({
            message: "success",
            response
        })
    } catch (error:any) {

        return new Error(error.message)
        
    }

}