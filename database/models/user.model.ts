import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";

  // Student-specific fields
  semester?: string;
  department?: string;

  // Teacher-specific fields
  subjects?: string[];
  experience?: number;

  // Admin-specific fields
  permissions?: string[];

  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
  },
  semester: { type: String },
  department: { type: String },
  subjects: { type: [String] },
  experience: { type: Number },
  permissions: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model<IUser>("User", UserSchema);
