import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { location } = body;
    console.log("api key")
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    console.log("location")
    console.log(location)
    
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {

        params: {
          keyword: 'school',
          location: `${location.lat},${location.lng}`,
          radius: 10000,
          type: 'school',
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        },
      }
    );
    console.log(response)
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in schools API:', error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}