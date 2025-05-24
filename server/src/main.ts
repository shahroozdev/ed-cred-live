import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";
import { existsSync, mkdirSync } from "fs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.enableCors();
  const uploadsPath = join(process.cwd(), "uploads");
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }

  // Then configure static assets
  app.useStaticAssets(uploadsPath, {
    prefix: "/uploads/",
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    ["/docs", "/docs-json"], // Protect Swagger UI and JSON endpoint
    basicAuth({
      users: { admin: "password123" }, // Change this to a strong username & password
      challenge: true,
    })
  );
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("ED CRED API")
    .setDescription("API documentation for my NestJS app")
    .setVersion("1.0")
    .addBearerAuth() // If you have authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 6969);
}
bootstrap();
