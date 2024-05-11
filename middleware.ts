import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
    '/dashboard',
    '/dashboard/upcoming',
    '/dashboard/personal-room',
    '/dashboard/previous',
    '/dashboard/recordings',
    '/dashboard/meeting(.*)',
])

export default clerkMiddleware((auth , req) => {
    // if(protectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};