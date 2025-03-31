import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/mongoose";
import ExamAttempt from "@/database/models/examattempt.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth"; // ✅ Correct import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  const session = await getServerSession(req, res, authOptions); // ✅ Pass req, res

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { examId } = req.body;

  try {
    // Check if the student has already started the exam
    const existingAttempt = await ExamAttempt.findOne({
      examId,
      studentId: session.user.id,
    });

    if (existingAttempt) {
      return res.status(200).json(existingAttempt); // ✅ Return existing attempt
    }

    // Create a new exam attempt
    const attempt = await ExamAttempt.create({
      examId,
      studentId: session.user.id,
    });

    return res.status(201).json(attempt); // ✅ Return newly created attempt
  } catch (error) {
    console.error("Error starting exam:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
