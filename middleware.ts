import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req)=> {
  if(isProtectedRoute(req)) auth().protect();
});

const isProtectedRoute = createRouteMatcher([
  "/main/tour/:path*",
]);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};