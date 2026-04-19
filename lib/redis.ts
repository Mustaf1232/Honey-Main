import { createClient } from "redis";

const redis_client = createClient({
  socket: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  password: process.env.REDIS_PASSWORD as string,
});

redis_client.on("error", (err) => {
  console.error("Redis client error:", err.message);
});

if (!redis_client.isOpen) {
  redis_client.connect().catch((err) => {
    console.error("Redis connect error:", err.message);
  });
}

export { redis_client };
