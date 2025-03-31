// pages/api/exam/saveAnswer.ts
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/mongoose";
import ExamAttempt from "@/database/models/examattempt.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth"; // ✅ Correct import path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  await connectDB();
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ message: "Unauthorized" });

  const { examId, questionId, answer } = req.body;

  const attempt = await ExamAttempt.findOne({
    examId,
    studentId: session.user.id,
  });

  if (!attempt)
    return res.status(404).json({ message: "Exam attempt not found" });

  const answerIndex = attempt.answers.findIndex((a: any) =>
    a.questionId.equals(questionId)
  );

  if (answerIndex !== -1) attempt.answers[answerIndex].answer = answer;
  else attempt.answers.push({ questionId, answer });

  await attempt.save();
  res.json({ message: "Answer saved" });
}
