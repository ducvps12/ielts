import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { parseEnvironment } from "@levelup/config";

import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const environment = parseEnvironment();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: [environment.APP_URL, environment.ADMIN_URL],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();

  await app.listen(environment.PORT, "0.0.0.0");
}

bootstrap().catch((error: unknown) => {
  console.error("API failed to start", error);
  process.exit(1);
});
