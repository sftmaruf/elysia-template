import Elysia from "elysia";
import authMiddleware from "./middlewares/auth";
import logger from "./middlewares/logger/logger";
import { AuthController } from "./controllers/auth.controller";

export const baseApp = new Elysia({ prefix: "/api/v1" })
  .use(authMiddleware)
  .use(logger)
  .derive({ as: "scoped" }, async ({ isAuthenticated }) => {
    return { isAuthenticated };
  })
  .onError(({ code }) => {
    // handle unknown errors
    if (code === "UNKNOWN") {
      return { message: "Something went wrong" };
    }
  });

const startup = baseApp.use(AuthController);

export type BaseAppType = typeof baseApp;
export { startup };
