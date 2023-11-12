import { connectMongoDB } from "@/lib/mongodb";
import Faculty from "@/models/faculty";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const facultyData = await req.json();

    connectMongoDB();

    if (facultyData.id) {
      // If facultyData has an ID, update the existing document
      await Faculty.findByIdAndUpdate(facultyData.id, facultyData);
      return NextResponse.json({ message: "Faculty updated", status: 200 });
    } else {
      // If facultyData does not have an ID, create a new document
      await Faculty.create(facultyData);
      return NextResponse.json({ message: "Faculty created", status: 201 });
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
      const deletedFaculty = await Faculty.findByIdAndDelete(id);

      if (deletedFaculty) {
        return NextResponse.json({ message: "Faculty deleted", status: 200 });
      } else {
        return NextResponse.json({ message: "Faculty not found", status: 404 });
      }
    } else {
      return NextResponse.json({ message: "ID not provided", status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error Occurred!", status: 500 });
  }
}