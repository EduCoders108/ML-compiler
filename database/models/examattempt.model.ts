import mongoose, { Schema, Document } from "mongoose";

interface Answer {
  questionId: mongoose.Types.ObjectId;
  code: string; // Changed 'answer' to 'code' for clarity
  lastUpdated: Date; // Track last modification time
}

export interface IExamAttempt extends Document {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  status: "ongoing" | "submitted" | "expired";
  answers: Answer[];
}

const ExamAttemptSchema = new Schema<IExamAttempt>({
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: {
    type: String,
    enum: ["ongoing", "submitted", "expired"],
    default: "ongoing",
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
