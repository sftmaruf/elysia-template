import {
  LoginUserDTOSchema,
  LoginUserRequestSchema,
  RegisterUserRequestSchema,
  RegisteUserDTOSchema,
} from "../moduels/auth/auth.model";
import { BaseAppType } from "../routes";
import AuthService from "../moduels/auth/auth.service";
import { ActionResponse, TResponse } from "../shared/Response";

export const AuthController = (app: BaseAppType) =>
  app.group("/auth", (app) =>
    app.post(
      "/register",
      async ({ body, set }) => {
        const response = await AuthService.create(body);
        return ActionResponse(set, response, response.success ? 201 : 500);
      },
      {
        body: RegisterUserRequestSchema,
        response: TResponse(RegisteUserDTOSchema),
        detail: {
          tags: ["Auth"],
          summary: "Register a new user",
          description: "Create a new user account",
        },
      }
    )
     .post(
      '/login',
      async ({ body, set }) => {
        const response = await AuthService.login(body);
        return ActionResponse(set, response);
      },
      {
        body: LoginUserRequestSchema,
        response: TResponse(LoginUserDTOSchema),
        detail: {
          tags: ['Auth'],
          summary: 'User login',
          description: 'Authenticate a user and return a token',
        },
      },
    ),
  );
