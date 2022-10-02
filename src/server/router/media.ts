import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

export const mediaRouter = createRouter()
  //   .query("get", {
  //     input: z.object({
  //       id: z.string(),
  //     }),
  //     async resolve({ ctx, input }) {
  //       const user = await ctx.prisma.user.findUnique({
  //         where: {
  //           id: input?.id,
  //         },
  //       });
  //       if (user) {
  //         return {
  //           id: user.id,
  //           image: user.image,
  //           name: user.name,
  //         };
  //       } else {
  //         throw new trpc.TRPCError({
  //           code: "NOT_FOUND",
  //           message: "User not found",
  //         });
  //       }
  //     },
  //   })
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
