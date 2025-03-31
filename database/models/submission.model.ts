import mongoose, { Schema, Document, model } from "mongoose";

export interface ISubmission extends Document {
  student: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  question: mongoose.Types.ObjectId;
  code: string;
  output: string;
  outputImages: string[]; // Array of image URLs
  executionLogs?: string; // Optional logs (errors, warnings, etc.)
  status: "Pending" | "Passed" | "Failed" | "Reviewed";
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  code: { type: String, required: true },
  output: { type: String },
  outputImages: [{ type: String }], // Store image URLs
  executionLogs: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Passed", "Failed", "Reviewed"],
    default: "Pending",
  },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Submission ||
  model<ISubmission>("Submission", SubmissionSchema);
