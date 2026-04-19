import Redis from "ioredis";

export const redis_client = new Redis({
  //@ts-expect-error: types are not correct
  port: process.env.REDIS_PORT as number,
  host: process.env.REDIS_HOST as string,
  password: process.env.REDIS_PASSWORD as string,
});
