import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";


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
    }),

  getOthersSessions: protectedProcedure
    .input(z.string())
    .query(({ input }) => {
      const lastWeek = new Date()
      // add 7 days to the current date
      lastWeek.setDate(new Date().getDate() - 7)


      return prisma.workoutSession.findMany({
        where: {
          workoutType: {
            equals: input
          },
          dateTimeCreated: {
            gte: lastWeek
          },
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });
    })
});
