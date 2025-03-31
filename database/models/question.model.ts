import mongoose, { Schema, Document, model } from "mongoose";

export interface IQuestion extends Document {
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
}

const QuestionSchema = new Schema<IQuestion>({
  topic: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  questionText: { type: String, required: true },
  expectedOutputType: { type: String, required: true },
  codeTemplate: { type: String },
});

export default mongoose.models.Question ||
  model<IQuestion>("Question", QuestionSchema);
