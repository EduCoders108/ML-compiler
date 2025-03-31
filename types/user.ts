export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  profile?: {
    department?: string;
    institution?: string;
    contactNumber?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
