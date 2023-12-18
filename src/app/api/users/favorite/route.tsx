import Property from "@/models/Property";
import { connect } from "http2";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/UserModel";
// Your POST route handler
// Your POST route handler
export async function POST(req: Request, res: Response) {
    try {
      const reqBody = await req.json();
      const { slug, token } = reqBody;
      console.log(token)
      if (!slug ){
        type Decode = { id: string; username: string; email: string };
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as string | Decode;
        if (typeof decode === 'string') {
          return NextResponse.json({
            message: 'Invalid token',
          });
        }

        const user = await User.findById(decode.id);

        if (!user){
          return NextResponse.json({
            message: 'User not found',
          });
        }
        const wish = user.wishlist;

        return NextResponse.json({
          message: "We got your Favorites",
          wish

        })
        
      }
      try {
        type Decode = { id: string; username: string; email: string };
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as string | Decode;
        if (typeof decode === 'string') {
          return NextResponse.json({
            message: 'Invalid token',
          });
        }

        const property = await Property.findOne({ slug });
        if (!property) {
          return NextResponse.json({
            message: 'Property not found',
          });
        }
        console.log(property._id);
        const fav = property._id;
        const favArray = Array.isArray(fav) ? fav : [fav];

        const updatedUser = await User.findOneAndUpdate(
          { _id: decode.id },
          { $push: { wishlist: { $each: favArray } } },
          { new: true }
        );

      if (!updatedUser) {
        return NextResponse.json({
          message: 'User not found',
        });

        
      }

      return NextResponse.json({
        message: 'Property added to wishlist',
      });
    
      } catch (error: any) {
        console.log(error);
        return NextResponse.json({
          message: 'Error processing request',
        });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message });
    }
  }
  