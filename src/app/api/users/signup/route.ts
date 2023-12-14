import bcryptjs from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/UserModel';
import { NextRequest, NextResponse } from "next/server";
connect()
export async function POST(request: NextRequest, response:NextResponse){
    try {
    const reqBody = await request.json();
    const {username, password,email ,name } = reqBody;
    console.log(name)
    const user = await User.findOne({username});

    if (user) {
        return NextResponse.json("A user has already been created") }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            password: hashedPassword,
            name, email
        })
        const savedUser = await newUser.save();
        return NextResponse.json({
            success:true,
            savedUser
        })

        
    } catch (error:any) {
 return NextResponse.json({error: error.message }, { status: 500 }); 
    }
}