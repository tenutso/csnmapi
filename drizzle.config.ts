import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL ??"",
    authToken: process.env.DATABASE_PASSWORD ?? ""
  },
  dialect: 'turso',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  casing: 'snake_case'
});
