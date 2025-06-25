import { t } from "elysia";

export const ErrorResponseScheme = t.Object({
  status: t.Literal("success"),
  message: t.String(),
});
