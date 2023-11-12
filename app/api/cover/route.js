import { connectMongoDB } from "@/lib/mongodb";
import Cover from "@/models/cover";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const coverData = await req.json();
    connectMongoDB();

    if (coverData.id) {
      // If coverData has an ID, update the existing document
      await Cover.findByIdAndUpdate(coverData.id, coverData);
      return NextResponse.json({ message: "Cover updated", status: 200 });
    } else {
      // If coverData does not have an ID, create a new document
      await Cover.create(coverData);
      return NextResponse.json({ message: "Cover created", status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Occurred!", status: 500 });
  }
}

export async function DELETE(req) {
    try {
      const { id } = await req.json();
      connectMongoDB();
  
      if (id) {
        // If ID is provided, delete the document with that ID
        const deletedCover = await Cover.findByIdAndDelete(id);
  
        if (deletedCover) {
          return NextResponse.json({ message: "Cover deleted", status: 200 });
        } else {
          return NextResponse.json({ message: "Cover not found", status: 404 });
        }
      } else {
        return NextResponse.json({ message: "ID not provided", status: 400 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error Occurred!", status: 500 });
    }
  }

