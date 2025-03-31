import mongoose, { Schema, Document, model } from "mongoose";

export interface IExam extends Document {
  title: string;
  semester: string;
  topic: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId; // Reference to Teacher
  questions: mongoose.Types.ObjectId[]; // Reference to Questions
}

const ExamSchema = new Schema<IExam>({
  title: { type: String, required: true },
  semester: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

export default mongoose.models.Exam || model<IExam>("Exam", ExamSchema);
