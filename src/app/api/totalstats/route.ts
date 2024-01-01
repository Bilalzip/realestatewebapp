import Property from "@/models/Property";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest, response:NextResponse){
    try {

        const UserData = await User.aggregate([
            {
              $group: {
                _id: null,
                totalUsers: { $sum: 1 }
              }
            }
          ]);

          const PropertyData = await Property.aggregate([
            {
                $group:{
                    _id:null,
                    totalProperties: { $sum:1}
                }
            }
          ])
    
          const Data = {
            UserData: UserData,
            PropertyData:PropertyData
          }

          return NextResponse.json({
            success: true,
            Data
          })
        
    } catch (error) {
        return NextResponse.json(error);
    }
}