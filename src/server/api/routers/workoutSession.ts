import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


export const workoutSessionRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({
    amount: z.number(),
    dateTimeEnd: z.date(),
    dateTimeStart: z.date(),
    workoutType: z.string()
  }))
    .mutation(({ ctx, input }) => {
      const { session } = ctx;
      return ctx.prisma.workoutSession.create({
        data: {
          ...input,
          userId: session.user.id
        }
      });
    }),

  getTodaySessions: protectedProcedure
    .query(({ ctx }) => {
      const { prisma, session } = ctx;
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      return prisma.workoutSession.findMany({
        where: {
          dateTimeCreated: {
            gte: start
          },
          userId: {
            equals: session.user.id
          }
        }
      });
    })
});
