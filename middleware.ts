import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ✅ Public Routes (No Authentication Required)
const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/Editor",
  "/datasets",
  "/api/users/register",
  "/api/users/login",
  "/ExamPortal",
];

// ✅ Role-Based Access Control
const rolePermissions = {
  student: ["/ExamPortal/student"],
  teacher: ["/ExamPortal/teacher"],
  admin: ["/ExamPortal/student", "/ExamPortal/teacher"],
};

// ✅ Function to check if path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(
    (publicPath) =>
      path.toLowerCase() === publicPath.toLowerCase() ||
      path.toLowerCase().startsWith(`${publicPath.toLowerCase()}/`)
  );
};

// ✅ Function to check role-based access
const hasPermission = (path: string, role?: string) => {
  if (!role || !(role in rolePermissions)) return false;
  return rolePermissions[role as keyof typeof rolePermissions].some(
    (allowedPath) => path === allowedPath || path.startsWith(`${allowedPath}/`)
  );
};

// ✅ Log request information
const logRequest = (req: Request, user: any) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - User: ${user?.email || "Unauthenticated"}`
  );
};

// ✅ Main Middleware Function
export async function middleware(req: NextRequest) {
  const path = new URL(req.url).pathname;

  // ⏩ Skip Middleware for Next.js Internal Routes and Static Assets
  if (path.startsWith("/_next") || /\.(svg|png|jpg|css|js|ico)$/.test(path)) {
    return NextResponse.next();
  }

  // ✅ Allow Public Routes
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // 🔐 Get User Session Token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role;

  // 📝 Log Requests
  logRequest(req, token);

  // 🔄 Redirect if Not Authenticated
  if (!token) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("callbackUrl", encodeURIComponent(req.url));
    return NextResponse.redirect(url);
  }

  // 🚫 Restrict Access Based on Role
  if (!hasPermission(path, role)) {
    const redirectPath =
      role === "admin" && !path.startsWith("/ExamPortal/admin")
        ? "/ExamPortal/admin/dashboard"
        : role === "teacher" && !path.startsWith("/ExamPortal/teacher")
          ? "/ExamPortal/teacher"
          : role === "student" && !path.startsWith("/ExamPortal/student")
            ? "/ExamPortal/student"
            : null;

    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Apply Middleware to All Routes Except Static Files & Auth API
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
