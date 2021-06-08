import type { Redis } from "ioredis";

interface RedisPrefixed {
  defaultRedis: Redis;
  tracksRedis: Redis;
  gamesRedis: Redis;
  chatbotInputRedis: Redis;
  chatbotResponseRedis: Redis;
  ribbonsRedis: Redis;
}

export type { RedisPrefixed };
