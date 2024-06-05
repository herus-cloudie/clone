import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
    '/',
    '/upcoming',
    '/inviting',
    '/previous',
    '/recordings',
    '/meeting(.*)',
])

export default clerkMiddleware((auth , req) => {
    if(protectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};