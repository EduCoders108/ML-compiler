import mongoose, { Schema, Document } from "mongoose";

interface Answer {
  questionId: mongoose.Types.ObjectId;
  code: string; // student's answer code
  lastUpdated: Date;
}

export interface IExamAttempt extends Document {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  status: "not_started" | "ongoing" | "submitted" | "expired"; // 🎯 Student-specific attempt status
  answers: Answer[];
}

const ExamAttemptSchema = new Schema<IExamAttempt>({
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: {
    type: String,
    enum: ["not_started", "ongoing", "submitted", "expired"],
    default: "not_started", // ✅ Different from exam's status
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      code: { type: String, required: true },
      lastUpdated: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.ExamAttempt ||
  mongoose.model<IExamAttempt>("ExamAttempt", ExamAttemptSchema);
