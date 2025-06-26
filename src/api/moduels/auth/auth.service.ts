import {
  LoginUserDTO,
  LoginUserModel,
  RegisterUserModel,
  RegisteUserDTO,
} from "./auth.model";
import Result, { TResult } from "../../shared/result";
import AuthHelper from "../../../infrastructure/shared/jwt";
import UserErrors from "../../../domain/errors/auth-errors";
import UserRepository from "../../../infrastructure/repositories/user.repository";

const create = async (
  model: RegisterUserModel
): Promise<TResult<RegisteUserDTO>> => {
  const user = await UserRepository.findByUsername(model.username);
  if (user) return Result.error(UserErrors.AlreadyExist);

  model.password = await AuthHelper.hashPassword(model.password);
  const createdUser = await UserRepository.createUser(model);

  if (!createdUser) return Result.error(UserErrors.CreationFailed);

  const registeredUser: RegisteUserDTO = {
    id: createdUser.id,
    username: createdUser.username,
  };

  return Result.success<RegisteUserDTO>(registeredUser);
};

const login = async (model: LoginUserModel): Promise<TResult<LoginUserDTO>> => {
  const user = await UserRepository.findByUsername(model.username);
  if (!user) return Result.error(UserErrors.NotFound);

  const isPasswordValid = await AuthHelper.verifyPassword(
    model.password,
    user.password
  );
  if (!isPasswordValid) return Result.error(UserErrors.NotFound);

  const { id, email, username } = user;
  const token = AuthHelper.generateToken({
    id,
    email,
    username,
  });

  return Result.success({
    user: {
      username: user.username,
      email: user.email
    },
    token,
  });
};

const AuthService = {
  create,
  login,
};

export default AuthService;
