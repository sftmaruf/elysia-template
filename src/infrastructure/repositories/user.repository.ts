import { db } from "../db";
import { User, UserInsertInput, usersTable } from "../../domain/user/user";
import { eq } from "drizzle-orm";

// export interface IUserRepository {
//   // findByUsername(username: string): Promise<User | null>;
//   // findById(id: string): Promise<User | null>;
//   findByUsername(username: string): Promise<User | null>;
//   createUser(user: UserInsertInput): Promise<User>;
//   // updatePassword(id: string, newPasswordHash: string): Promise<void>;
// }

const createUser = async (user: UserInsertInput): Promise<User> => {
  const newUser = await db.insert(usersTable).values(user).returning();

  return newUser[0];
};

const findByUsername = async (username: string): Promise<User> => {
  const user = await db.selectDistinct().from(usersTable).where(eq(usersTable.username, username));
  return user[0];
};

const UserRepository = {
  createUser,
  findByUsername
};

export default UserRepository;
