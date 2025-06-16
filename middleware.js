import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect(); // Redirect if not logged in
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // Match all app routes except static files
  ],
};
