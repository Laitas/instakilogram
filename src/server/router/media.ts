import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const mediaRouter = createRouter()
  .query("getAll", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.post.findMany({
        where: {
          userId: input?.id,
        },
      });
      if (posts) {
        return {
          posts,
        };
      } else {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Media not found",
        });
      }
    },
  })
  .mutation("upload", {
    input: z.object({
      url: z.string(),
      desc: z.string().optional(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.create({
        data: {
          url: input?.url,
          desc: input?.desc,
          userId: input?.id,
        },
      });
    },
  });
