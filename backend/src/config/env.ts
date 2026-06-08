import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().default('./data.db'),
});

export const env = envSchema.parse(process.env);
