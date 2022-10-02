// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user";
import { mediaRouter } from "./media";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("media.", mediaRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
