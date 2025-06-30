import { createNestApplication } from './dist/main'; // adjust based on your main.ts setup
import { createServer } from '@nestjs/platform-express';
import { Server } from 'http';

let cachedServer: Server;

export default async function handler(req, res) {
  if (!cachedServer) {
    const app = await createNestApplication();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = createServer(expressApp);
  }

  return cachedServer.emit('request', req, res);
}
