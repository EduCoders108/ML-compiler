import { NextResponse } from "next/server";
import connectDB from "@/database/mongoose";
import Exam from "@/database/models/exam.model";
import Question from "@/database/models/question.model";

export async function POST(req: Request) {
  try {
    console.log("✅ API Route Hit:", req.url);

    await connectDB();

    const body = await req.json();
    if (!body) {
      console.error("❌ Empty request body");
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const { type } = body;

    // Handle question creation
    if (type === "question") {
      console.log("📌 Processing question:", body);

      const { questionText, expectedOutputType, codeTemplate } = body;

      // ✅ Only validate required frontend fields
      if (!questionText || !expectedOutputType) {
        console.error("❌ Missing required question fields");
        return NextResponse.json(
          { error: "Missing required question fields" },
          { status: 400 }
        );
      }

      const newQuestion = new Question({
        questionText,
        expectedOutputType,
        codeTemplate: codeTemplate || "",
      });

      await newQuestion.save();
      console.log("✅ Question created:", newQuestion._id);

      return NextResponse.json(
        {
          message: "Question created successfully!",
          questionId: newQuestion._id,
        },
        { status: 201 }
      );
    }

    // Handle exam creation
    else if (type === "exam") {
      console.log("📌 Processing exam:", body);

      const {
        title,
        semester,
        date,
        duration,
        totalMarks,
        status,
        questions,
        createdBy,
      } = body;

      // Validate required fields according to schema
      if (!title || !semester || !date) {
        console.error("❌ Missing required exam fields");
        return NextResponse.json(
          {
            error:
              "Missing required exam fields: title, semester, and date are required",
          },
          { status: 400 }
        );
      }

      // Validate date format
      const examDate = new Date(date);
      if (isNaN(examDate.getTime())) {
        console.error("❌ Invalid date format");
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 400 }
        );
      }

      // Create new exam with all potential fields from schema
      const newExam = new Exam({
        title,
        semester,
        date: examDate,
        duration,
        totalMarks,
        status,
        createdBy,
        questions: questions || [],
      });

      await newExam.save();
      console.log("✅ Exam created:", newExam);

      return NextResponse.json(
        {
          message: "Exam created successfully!",
          exam: newExam,
        },
        { status: 201 }
      );
    }

    // Handle unknown type
    else {
      console.error("❌ Unknown request type");
      return NextResponse.json(
        { error: "Unknown request type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("❌ Error creating exam:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
