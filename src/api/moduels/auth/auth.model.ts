import { t } from "elysia";

export const RegisterUserRequestSchema = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
});

export const RegisteUserDTOSchema = t.Object({
  id: t.String(),
  username: t.String(),
});

export const LoginUserRequestSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

export const LoginUserDTOSchema = t.Object({
  user: t.Object({
    username: t.String(),
    email: t.String(),
  }),
  token: t.String()
});

export type RegisterUserModel = typeof RegisterUserRequestSchema.static;
export type LoginUserModel = typeof LoginUserRequestSchema.static;

export type RegisteUserDTO = typeof RegisteUserDTOSchema.static;
export type LoginUserDTO = typeof LoginUserDTOSchema.static;