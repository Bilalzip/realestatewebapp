import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

interface UpdateUserRequest {
  token: string;
  user: {
    username?: string;
    name?: string;
    email?: string;
    profilePic?: string;
  }
}

interface UpdateUserResponse {
  status: number;
  message: string;
  data?: any;
  error?: any;
}

connect();

export async function POST(req: NextRequest): Promise<NextResponse<UpdateUserResponse>> {
  try {
    const { token, user } = await req.json() as UpdateUserRequest;

    console.log("user", user);
    
    if (!token) {
      return NextResponse.json({ 
        status: 400, 
        message: "Token not provided!" 
      });
    }
    
    let userDecoded: JwtPayload;
    try {
      userDecoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      return NextResponse.json({ 
        status: 401, 
        message: "Invalid or expired token" 
      });
    }

    if (!userDecoded || !userDecoded.id) {
      return NextResponse.json({ 
        status: 404, 
        message: "User not found" 
      });
    }

    const userData = await User.findById(userDecoded.id);
    if (!userData) {
      return NextResponse.json({ 
        status: 404, 
        message: "User not found" 
      });
    }
    
    // Prepare update object
    const dataUpdate: UpdateUserRequest['user'] = {};
    if (user.username && userData.username !== user.username) dataUpdate.username = user.username;
    if (user.name && userData.name !== user.name) dataUpdate.name = user.name;
    if (user.email && userData.email !== user.email) dataUpdate.email = user.email;
    if (user.profilePic && user.profilePic !== userData.profilePic) dataUpdate.profilePic = user.profilePic;

    console.log("dataUpdate.profilePic", user.profilePic);
    
    if (Object.keys(dataUpdate).length === 0) {
      return NextResponse.json({ 
        status: 200, 
        message: "No changes detected" 
      });
    }

    console.log(" userDecoded.id,", userDecoded.id);
    const updatedUser = await User.findByIdAndUpdate(
      userDecoded.id,
      { $set: dataUpdate },
      { new: true }
    );
    
    console.log("updatedUser", updatedUser);

    return NextResponse.json({
      status: 200,
      message: "Profile updated successfully!",
      data: updatedUser,
    });

  } catch (error) {
    return NextResponse.json({ 
      status: 500, 
      message: "Internal server error!", 
      error 
    });
  }
}
