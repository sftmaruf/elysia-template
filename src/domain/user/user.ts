import { Static } from "elysia";
import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull()
});

const userInsertSchema = createInsertSchema(usersTable);
const userSelectSchema = createSelectSchema(usersTable);
export type UserInsertInput = Static<typeof userInsertSchema>;
export type User = Static<typeof userSelectSchema>;