// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { join } from "path";
// import { NestExpressApplication } from "@nestjs/platform-express";
// import { ValidationPipe } from "@nestjs/common";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import * as basicAuth from "express-basic-auth";
// import { existsSync, mkdirSync } from "fs";
// import { UploadExceptionFilter } from "./decorators/globalErrorHandlerClass/uploadErrorGlobal";
// import { json, urlencoded } from "express";
// import * as dotenv from 'dotenv';
// dotenv.config();
// // import * as bodyParser from 'body-parser';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
//     // bodyParser: true,
//     abortOnError: false,
//   });
//   app.enableCors();
//   const uploadsPath = join(process.cwd(), "uploads");
//   if (!existsSync(uploadsPath)) {
//     mkdirSync(uploadsPath, { recursive: true });
//   }

//   // Then configure static assets
//   app.useStaticAssets(uploadsPath, {
//     prefix: "/uploads/",
//   });
//   app.useGlobalFilters(new UploadExceptionFilter());
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

//   app.use(
//     ["/docs", "/docs-json"], // Protect Swagger UI and JSON endpoint
//     basicAuth({
//       users: { admin: "password123" }, // Change this to a strong username & password
//       challenge: true,
//     })
//   );
//   // Swagger Configuration
//   const config = new DocumentBuilder()
//     .setTitle("ED CRED API")
//     .setDescription("API documentation for my NestJS app")
//     .setVersion("1.0")
//     .addBearerAuth() // If you have authentication
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup("docs", app, document);
//   app.use(json({ limit: "500mb" }));
//   app.use(urlencoded({ extended: true, limit: "500mb" }));
//   await app.listen(process.env.PORT ?? 6969);
// }
// bootstrap();
// src/main.ts
import { createApp } from './bootstrap';

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 6969);
}
bootstrap();
