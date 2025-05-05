import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
    app.enableCors();
    app.useStaticAssets(
        join(__dirname, '..', '..', '..', '..', 'client', 'public', 'uploads'), {
            prefix: '/uploads/',
        },
    );

    await app.listen(process.env.PORT ?? 6969);
}
bootstrap();
