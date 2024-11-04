import Redis from 'ioredis';

export const redis = new Redis({
  host: Bun.env.REDIS_HOST,
  port: Bun.env.REDIS_PORT,
  password: Bun.env.REDIS_PASSWORD,
});
