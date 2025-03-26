// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that don't require authentication
const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/Editor",
  "/datasets",
  "/register",
  "/api/auth",
  "/ExamPortal", // Ensure ExamPortal is fully public
  "/ExamPortal/examinee",
  "/ExamPortal/examinee/dashboard",
  "/ExamPortal/examinee/take-exam",
  "/ExamPortal/examinee/view-results",
  "/ExamPortal/examiner",
  "/ExamPortal/examiner/dashboard",
  "/ExamPortal/examiner/create-exam",
  "/ExamPortal/examiner/view-results",
];

// Different role-based permissions
const rolePermissions = {
  student: ["/ExamPortal/student"],
  examiner: ["/ExamPortal/examiner"],
  admin: ["/ExamPortal/admin", "/ExamPortal/examiner"], // Admin has access to examiner paths too
};

// Check if a path should be public
const isPublicPath = (path) => {
  return publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  );
};

// Check if user has permission to access path based on their role
const hasPermission = (path, role) => {
  if (!role) return false;

  // Check if the user has permission for this path
  const allowedPaths = rolePermissions[role] || [];
  return allowedPaths.some(
    (allowedPath) => path === allowedPath || path.startsWith(`${allowedPath}/`)
  );
};

// Rate limiting middleware function (simplified)
const rateLimit = (req) => {
  // In a real implementation, this would check a database or cache
  // to enforce rate limits on API routes

  // Check if it's an API route
  if (req.nextUrl.pathname.startsWith("/api/")) {
    // For demonstration, we're not implementing actual rate limiting logic
    // But you would check request counts against limits here
    console.log("Rate limiting check for API route");
  }

  return false; // Return true if rate limit exceeded
};

// Log request information
const logRequest = (req, user) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname} - User: ${user?.email || "Unauthenticated"}`
  );
};

// Main middleware function
export async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Skip middleware for next.js internal routes and static files
  if (
    path.includes("/_next") ||
    path.includes("/favicon.ico") ||
    path.endsWith(".svg") ||
    path.endsWith(".png") ||
    path.endsWith(".jpg") ||
    path.endsWith(".css") ||
    path.endsWith(".js")
  ) {
    return NextResponse.next();
  }

  // Check for rate limiting on API routes
  if (rateLimit(req)) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests, please try again later" }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Allow access to public paths without authentication
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // Get the token and user session
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const user = token?.user;

  // Log the request
  logRequest(req, user);

  // If no token/session exists, redirect to login
  if (!user) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
  }

  // Check role-based permissions
  if (!hasPermission(path, user.role)) {
    // Redirect to appropriate dashboard based on role
    let redirectPath;

    switch (user.role) {
      case "admin":
        redirectPath = "/ExamPortal/admin/dashboard";
        break;
      case "examiner":
        redirectPath = "/ExamPortal/examiner/dashboard";
        break;
      case "student":
        redirectPath = "/ExamPortal/student/dashboard";
        break;
      default:
        redirectPath = "/";
    }

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // If user has permission, proceed with the request
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
