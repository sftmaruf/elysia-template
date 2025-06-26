import { startup } from './startup';
import { Elysia, t } from 'elysia';
import swagger from '@elysiajs/swagger';
import Config from '../infrastructure/shared/env';

const app = new Elysia()
  .use(
    swagger({
      exclude: ['/swagger'],
      autoDarkMode: true,
      documentation: {
        info: {
          title: '🦊 Elysia Clean Architecture',
          description:
            'Clean Architecture pattern for ElysiaJS + Bun + Postgres.js',
          version: '1.0.0',
          license: { name: 'MIT', url: 'https://opensource.org/license/mit/' },
          contact: {
            name: 'Lucas André Henry',
            url: 'https://www.linkedin.com/in/lucas-henryd/',
          },
        },
      },
    }),
  )
  .use(startup)
  .listen({ port: Config.PORT });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
