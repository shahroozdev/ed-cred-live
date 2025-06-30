// src/bootstrap.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";
import { existsSync, mkdirSync } from "fs";
import { UploadExceptionFilter } from "./decorators/globalErrorHandlerClass/uploadErrorGlobal";
import { json, urlencoded } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const createApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  app.enableCors();

  const uploadsPath = join(process.cwd(), "uploads");
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }

  app.useStaticAssets(uploadsPath, {
    prefix: "/uploads/",
  });

  app.useGlobalFilters(new UploadExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(
    ["/docs", "/docs-json"],
    basicAuth({
      users: { admin: "password123" },
      challenge: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("ED CRED API")
    .setDescription("API documentation for my NestJS app")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.use(json({ limit: "500mb" }));
  app.use(urlencoded({ extended: true, limit: "500mb" }));

  await app.init();
  return app.getHttpAdapter().getInstance(); // Return Express instance
};
