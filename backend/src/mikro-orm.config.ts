import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  host: 'postgres',
  port: 5432,
  user: 'app_user',
  password: 'app_pwd',
  dbName: 'app_db',

  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },

  debug: true,
});
