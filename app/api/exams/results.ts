import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import Submission from "@/database/models/submission.model";

export async function GET(req: Request) {
  await connectDB();
  const results = await Submission.find().populate("exam").populate("user");

  return NextResponse.json(results);
}
export async function POST(req: Request) {
  await connectDB();
  const { examId, userId, answers } = await req.json();

  const newSubmission = new Submission({ exam: examId, user: userId, answers });
  await newSubmission.save();

  return NextResponse.json({ message: "Submission saved successfully!" });
}
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  await Submission.findByIdAndDelete(id);

  return NextResponse.json({ message: "Submission deleted successfully!" });
}
