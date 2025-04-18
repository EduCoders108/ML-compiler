import mongoose, { Schema, Document, model } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  expectedOutputType: string;
  codeTemplate?: string;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  expectedOutputType: { type: String, required: true },
  codeTemplate: { type: String },
});

export default mongoose.models.Question ||
  model<IQuestion>("Question", QuestionSchema);
