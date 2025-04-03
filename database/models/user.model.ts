// import mongoose, { Schema, Document, model } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: "student" | "teacher" | "admin";

//   // Student-specific fields
//   semester?: string;
//   department?: string;

//   // Teacher-specific fields
//   subjects?: string[];
//   experience?: number;

//   // Admin-specific fields
//   permissions?: string[];

//   createdAt: Date;
// }

// const UserSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["student", "teacher", "admin"],
//     required: true,
//   },
//   semester: { type: String },
//   department: { type: String },
//   subjects: { type: [String] },
//   experience: { type: Number },
//   permissions: { type: [String] },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.User || model<IUser>("User", UserSchema);

import mongoose, { Schema, Document, model } from "mongoose";

// Define sub-schemas
const SkillSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
});

const ActivitySchema = new Schema({
  type: {
    type: String,
    enum: ["model", "project", "collaboration"],
    required: true,
  },
  event: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const StatsSchema = new Schema({
  models: { type: Number, default: 0 },
  deployments: { type: Number, default: 0 },
  collaborations: { type: Number, default: 0 },
});

// Define interfaces for sub-documents
export interface ISkill {
  name: string;
  level: number;
}

export interface IProject {
  name: string;
  description: string;
  stars: number;
  forks: number;
}

export interface IActivity {
  type: "model" | "project" | "collaboration";
  event: string;
  time: string;
  createdAt: Date;
}

export interface IStats {
  models: number;
  deployments: number;
  collaborations: number;
}

// Extend your existing user interface
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

  // Profile-specific fields
  username?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  skills?: ISkill[];
  projects?: IProject[];
  stats?: IStats;
  achievements?: string[];
  activity?: IActivity[];

  // Methods
  joinDate?: () => string;

  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  // Original fields
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

  // Added profile fields
  username: { type: String, unique: true, sparse: true },
  location: { type: String },
  bio: { type: String },
  profileImage: { type: String, default: "/profile.jpg" },
  skills: [SkillSchema],
  projects: [ProjectSchema],
  stats: { type: StatsSchema, default: () => ({}) },
  achievements: [{ type: String }],
  activity: [ActivitySchema],

  createdAt: { type: Date, default: Date.now },
});

// Virtual for formatted join date
UserSchema.virtual("joinDate").get(function (this: IUser) {
  const date = new Date(this.createdAt);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
});

// Use the existing model if it exists, otherwise create a new one
export default mongoose.models.User || model<IUser>("User", UserSchema);
