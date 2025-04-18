import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import ExamAttempt from "@/database/models/examattempt.model";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req });

    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const examId = req.nextUrl.searchParams.get("examId");
    const studentId = token.sub; // user ID

    if (!examId) {
      return NextResponse.json({ error: "Missing examId" }, { status: 400 });
    }

    let attempt = await ExamAttempt.findOne({ examId, studentId });

    if (attempt) {
      if (attempt.status === "submitted" || attempt.status === "expired") {
        return NextResponse.json(
          { message: "Exam already attempted", attempt },
          { status: 200 }
        );
      }

      return NextResponse.json({ attempt }, { status: 200 });
    }

    attempt = await ExamAttempt.create({
      examId,
      studentId,
      startTime: new Date(),
      status: "ongoing",
      answers: [],
    });

    return NextResponse.json({ attempt }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error starting exam attempt:", error.message);
    return NextResponse.json(
      { error: "Failed to start exam attempt" },
      { status: 500 }
    );
  }
}
