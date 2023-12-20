import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/UserModel";
import Property from "@/models/Property";

interface JwtPayload {
    id: string;
    // other properties if present
  }
  
export async function POST(req: NextRequest, res: NextResponse){

    const ReqBody = await req.json();
    const { pro, token  } = ReqBody;
    console.log(pro)
    console.log(token)

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const id = decode.id;
    console.log(id)
    const user = await User.findById(id);
    console.log(user)

    const wish = user.wishlist;
    // property 
    const property = await Property.find({slug: pro});
    const proid = property[0]._id;
    let index = 0;
    for (let i = 1; i < wish.length; i++){
            if (wish[i] == proid){ 
                index = i;
                break
        }
    }
    
    if (index !== -1) {
        // Remove the item at the specified index from the wishlist array
        wish.splice(index, 1);

        // Update the user document with the modified wishlist
        await User.findByIdAndUpdate(id, { wishlist: wish });

        return NextResponse.json({
            success: true,
            message: 'Property removed from wishlist',
        });

}

}