import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(['test', 'development', 'production'])
    .default('development'),
  PORT: z.string().default('4000'),

  // Database
  PGHOST: z.string().default('localhost'),
  PGPORT: z.string().default('6543'),
  PGDATABASE: z.string().default('notes_api'),
  PGUSER: z.string().default('notes_user'),
  PGPASSWORD: z.string(),
  PGIDLE_TIMEOUT: z.string().default('0'),
  PGCONNECT_TIMEOUT: z.string().default('30'),
});

const Config = envSchema.parse(process.env);

export default Config;
export const DATABASE_URL = `postgres://${Config.PGUSER}:${Config.PGPASSWORD}@${Config.PGHOST}:${Config.PGPORT}/${Config.PGDATABASE}`;