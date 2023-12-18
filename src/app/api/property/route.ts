import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/Property";
import mongoose from "mongoose";
import slugify from "slugify";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request: NextRequest, response: NextResponse,) {
    try {
      const Reqbody = await request.json();
      const {slug, id} = Reqbody;
      console.log(id)
      if (id && !slug ){

        const favorites = []
        for (let ids of id){
          console.log(ids)
          try {
            const property = await Property.findById(ids);
            console.log(property)
          favorites.push(property)
          } catch (error:any) {
            console.log(error.message)
          }
          

        }
        return NextResponse.json({
          sucess: true, 
          favorites
        });
      }
        const property = await Property.findOne({slug});
        if (!property){
          return NextResponse.json({
            message: "no property found"
          });
        }
        return NextResponse.json({
            success: true,
            message: "Property details are available",
            property,
          });
        
      } catch (error: any) {
        return NextResponse.json({ error: error.message });
      }
}