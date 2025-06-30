import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedApp:any = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedApp = app.getHttpAdapter().getInstance();
  }

  return cachedApp(req, res);
}
