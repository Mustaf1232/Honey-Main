import Redis from "ioredis";

let client: Redis | null = null;

export function get_redis_client(): Redis {
  if (!client) {
    client = new Redis({
      //@ts-expect-error: types are not correct
      port: process.env.REDIS_PORT as number,
      host: process.env.REDIS_HOST as string,
      password: process.env.REDIS_PASSWORD as string,
      showFriendlyErrorStack: false,
      lazyConnect: true,
    });
  }
  return client;
}

export const redis_client = get_redis_client();
