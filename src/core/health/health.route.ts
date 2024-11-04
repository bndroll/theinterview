import { Hono } from 'hono';

export const health = async () => {
  return {health: true};
};

export const healthRoute = new Hono()
  .get('/', async (c) => {
    const r = await health();
    return c.json(r);
  });

