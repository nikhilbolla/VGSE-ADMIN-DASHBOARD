import { connectMongoDB } from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const eventData = await req.json();
    connectMongoDB();

    if (eventData.id) {
      // If eventData has an ID, update the existing document
      await Event.findByIdAndUpdate(eventData.id, eventData);
      return NextResponse.json({ message: "Event updated", status: 200 });
    } else {
      // If eventData does not have an ID, create a new document
      await Event.create(eventData);
      return NextResponse.json({ message: "Event created", status: 201 });
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
        const deletedEvent = await Event.findByIdAndDelete(id);
  
        if (deletedEvent) {
          return NextResponse.json({ message: "Event deleted", status: 200 });
        } else {
          return NextResponse.json({ message: "Event not found", status: 404 });
        }
      } else {
        return NextResponse.json({ message: "ID not provided", status: 400 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error Occurred!", status: 500 });
    }
  }

