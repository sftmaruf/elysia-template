import path from "path";
import pino from "pino";
import Elysia from "elysia";

const logger = (app: Elysia) =>
  app.decorate(
    "logger",
    pino(
      {
        name: "Elysia Template",
        level: "debug",
        mixin() {
          return { requestId: "abcde12345fghij67890" };
        },
      },
      pino.transport({
        targets: [
          {
            target: path.join(__dirname, 'pretty.mjs'),
            options: {
              colorize: true,
              hideObject: true,
              useOnlyCustomProps: false,
            },
            level: "info",
          },
          {
            target: "pino/file",
            options: {
              destination: path.join(process.cwd(), "src/api/logs/app.log"),
            },
            level: "info",
          },
        ],
      })
    )
  );

export default logger;
