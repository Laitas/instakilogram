import sha256 from "crypto-js/sha256";
import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from "@trpc/server";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export const userRouter = createRouter()
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input?.id,
        },
      });
      if (user) {
        return {
          id: user.id,
          image: user.image,
          name: user.name,
        };
      } else {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
    },
  })
  .mutation("signup", {
    input: z.object({
      email: z.string().min(1),
      name: z.string().min(3),
      password: z.string().min(6),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.create({
        data: {
          email: input?.email,
          name: input?.name,
          password: hashPassword(input?.password),
        },
      });
    },
  })
  .mutation("checkCredentials", {
    input: z.object({
      email: z.string().min(1),
      password: z.string().min(6),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          password: true,
        },
      });
      if (user && user.password == hashPassword(input.password))
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        };
      else {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }
    },
  });
