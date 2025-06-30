// api/index.ts
import { createApp } from '../src/bootstrap';

let cachedApp: any = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await createApp();
  }

  return cachedApp(req, res);
}
