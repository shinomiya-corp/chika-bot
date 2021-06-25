import type { Snowflake } from 'discord.js';
import { forCooldown, redis } from '../data/redisClient';

export const setCooldown = (id: Snowflake, command: string, ms: number) =>
  redis.set(forCooldown(`${id}:${command}`), command, 'px', ms);

export const getCooldown = async (id: Snowflake, command: string) => {
  const ttl = await redis.ttl(forCooldown(`${id}:${command}`));
  if (ttl <= 0) {
    return 0;
  }
  return ttl;
};
