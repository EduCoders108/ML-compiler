import mongoose, { Schema, Document, model } from "mongoose";

export interface IExam extends Document {
  title: string;
  semester: string;
  date: Date;
  duration?: number;
  totalMarks?: number;
  status?: "Active" | "Draft" | "Scheduled" | "Completed";
  createdBy?: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
}

const ExamSchema = new Schema<IExam>({
  title: { type: String, required: true },
  semester: { type: String, required: true },
  duration: { type: Number, required: false },
  totalMarks: { type: Number, required: false },
  status: {
    type: String,
    enum: ["Active", "Draft", "Scheduled", "Completed"],
    default: "Draft",
  },
  date: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

// ✅ Add transformation to output examId instead of _id
ExamSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.examId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.models.Exam || model<IExam>("Exam", ExamSchema);
