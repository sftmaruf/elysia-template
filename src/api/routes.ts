import Elysia from "elysia";
import authMiddleware from "./middlewares/auth";
import { logger } from "@bogeychan/elysia-logger";
import { AuthController } from "./controllers/authController";

export const baseApp = new Elysia({ prefix: "/api/v1" })
  .use(authMiddleware)
  .use(logger())
  .derive({ as: "scoped" }, async ({ isAuthenticated, log, route }) => {
    return { isAuthenticated, log };
  })
  .onError(({ code }) => {
    // handle unknown errors
    if (code === "UNKNOWN") {
      return { message: "Something went wrong" };
    }
  });

const routes = baseApp.use(AuthController);

export type BaseAppType = typeof baseApp;
export { routes };
