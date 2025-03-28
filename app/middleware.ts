import { clerkMiddleware } from "@clerk/nextjs/server";

// Allow public access via the matcher itself
export default clerkMiddleware();

export const config = {
  matcher: [
    // Public access for these pages
    "/sign-in",
    "/sign-up(.*)", // Handles nested routes like /sign-up/verify
    // Apply middleware to other routes
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
