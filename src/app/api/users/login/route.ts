import mongoose from "mongoose";
import {connect } from "@/dbConfig/dbConfig"
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import { error } from "console";

import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error: "Password does not match"}, {status: 400})
        }

        const tokendata = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const createtoken = await jwt.sign(tokendata, process.env.JWT_SECRET!, {expiresIn: "1d"} );
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", createtoken, {  httpOnly: true
        })
        return response;




    } catch (error:any) {
            return NextResponse.json({error: error.message }, { status: 500 }); 
        }
}