import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

// Define interfaces for type safety
interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

interface UserResponse {
  status: number;
  message?: string;
  user?: {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

connect();

export async function POST(req: NextRequest): Promise<NextResponse<UserResponse>> {
  try {
    const { token } = await req.json() as { token: string };
    if (!token) {
      return NextResponse.json({ 
        status: 400, 
        message: "Token not provided!" 
      });
    }
    
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log(decoded);
    } catch (error) {
      return NextResponse.json({ 
        status: 401, 
        message: "Invalid or expired token!" 
      });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ 
        status: 404, 
        message: "User not found!" 
      });
    }

    console.log("user", user);
    return NextResponse.json({ 
      status: 200, 
      user: user.toObject() 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 500, 
      message: "Internal server error!" 
    });
  }
}
