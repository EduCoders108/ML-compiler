export interface User {
  id: string;
  name: string;
  email: string;
  userType: "student" | "teacher" | "admin";
  profile?: {
    department?: string;
    institution?: string;
    contactNumber?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
