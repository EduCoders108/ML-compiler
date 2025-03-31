import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import Message from "@/database/models/message.model";

export async function POST(req: Request) {
  await connectDB();
  const { sender, recipient, message } = await req.json();

  const newMessage = new Message({ sender, recipient, message });
  await newMessage.save();

  return NextResponse.json({ message: "Message sent!" });
}

export async function GET() {
  await connectDB();
  const messages = await Message.find()
    .populate("sender")
    .populate("recipient");

  return NextResponse.json(messages);
}
