import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose"; // Ensure the correct import path
import Exam from "@/database/models/exam.model"; // Ensure the correct import path

export async function GET() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await connectDB();

    console.log("📦 Fetching exams from DB...");
    const exams = await Exam.find({})
      .populate("createdBy")
      .populate("questions");

    console.log("✅ Exams fetched:", exams);
    return NextResponse.json(exams);
  } catch (error) {
    console.error("❌ Error fetching exams:", error);
    return NextResponse.json(
      { error: "Failed to load exams" },
      { status: 500 }
    );
  }
}
