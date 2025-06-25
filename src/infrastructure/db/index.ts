import 'dotenv/config';
import { DATABASE_URL } from '../shared/env';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(DATABASE_URL);