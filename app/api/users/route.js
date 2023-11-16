import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userName = await req.json();
    connectMongoDB();
    const userData = await User.findOne({ userName });
    return NextResponse.json({ userData, status: 200 });
  
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Occurred!", status: 500 });
  }
}