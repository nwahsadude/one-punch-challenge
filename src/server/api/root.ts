import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { workoutSessionRouter } from "~/server/api/routers/workoutSession";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  workoutSession: workoutSessionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
