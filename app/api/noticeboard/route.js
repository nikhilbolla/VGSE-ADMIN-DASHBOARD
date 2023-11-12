import { connectMongoDB } from "@/lib/mongodb";
import Notice from "@/models/noticeboard";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const noticeBoardData = await req.json();
    connectMongoDB();
    if (noticeBoardData.id) {
      // If noticeBoardData has an ID, update the existing document
      await Notice.findByIdAndUpdate(noticeBoardData.id, noticeBoardData);
      return NextResponse.json({ message: "Notice updated", status: 200 });
    } else {
      // If noticeBoardData does not have an ID, create a new document
      await Notice.create(noticeBoardData);
      return NextResponse.json({ message: "Notice created", status: 201 });
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
      const deletedNotice = await Notice.findByIdAndDelete(id);

      if (deletedNotice) {
        return NextResponse.json({ message: "Notice deleted", status: 200 });
      } else {
        return NextResponse.json({ message: "Notice not found", status: 404 });
      }
    } else {
      return NextResponse.json({ message: "ID not provided", status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error Occurred!", status: 500 });
  }
}