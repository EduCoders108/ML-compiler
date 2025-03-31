import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import Exam from "@/database/models/exam.model";

export async function POST(req: Request) {
  await connectDB();
  const { title, description, questions, creator } = await req.json();

  const newExam = new Exam({ title, description, questions, creator });
  await newExam.save();

  return NextResponse.json({ message: "Exam created successfully!" });
}
