import jwt from "jsonwebtoken";
import { User } from "../../domain/user/user";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (user: Omit<User, "password">): string => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token: string): Omit<User, "password"> => {
  return jwt.verify(token, JWT_SECRET) as Omit<User, "password">;
};

export const hashPassword = async (password: string): Promise<string> => {
  // eslint-disable-next-line no-undef
  return await Bun.password.hash(password);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await Bun.password.verify(password, hashedPassword);
};

const AuthHelper = {
  generateToken,
  verifyToken,
  hashPassword,
  verifyPassword,
};

export default AuthHelper;
