import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET(){

    const response = NextResponse.json(
        {
            message: "Logout successful",
            success: true,
        }
    )

    response.cookies.set("token", "", 
    { httpOnly: true, expires: new Date(0) 
    });
    return response;
    try {
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}