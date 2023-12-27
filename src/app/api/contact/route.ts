import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/Contact";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest, response: NextResponse){

   

    try {
        const ReqBody = await request.json();
        const { fullName,
        email,
        message,} = ReqBody;
    
        if (!fullName){
      return NextResponse.json({message: "Please enter a full name"})
        }
    
        if (!email){
            return NextResponse.json({message: "Please enter a email"})
        }
    
        if (!message){
            return NextResponse.json({message: "Please enter a message"})
        }
    
        const save = await new Contact({
            fullName, email, message
        }).save();

        console.log(save);
    
        return NextResponse.json({message:"Your message has been sent"});
    } catch (error:any) {
        return NextResponse.json({message: "Error: " + error.message})
    }



}