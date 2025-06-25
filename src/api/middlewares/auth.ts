import { Elysia } from "elysia";
import AuthHelper from "../../infrastructure/shared/jwt";

const authMiddleware = (app: Elysia) =>
  app
    .derive(async ({ request: { headers } }) => {
      const token = headers.get("authorization")?.replace("Bearer ", "");

      if (token) {
        const payload = AuthHelper.verifyToken(token);
        if (payload) return { isAuthenticated: true };
      }

      return {
        isAuthenticated: false,
      };
    })
    .macro({
      authorize(isProtected: boolean) {
        return {
          beforeHandle({ set, isAuthenticated }) {
            if (isProtected && !isAuthenticated) {
              set.status = 500;
              return { status: "badrequest", message: "Token is missing" };
            }
          },
        };
      },
    });

export default authMiddleware;
