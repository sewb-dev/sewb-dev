import { Redis } from 'ioredis';

const cache = new Redis({
  port: 6379,
  host: '127.0.0.1',
  db: 1,
});

export const cacheKeys: Record<string, string> = {
  QUESTION_GENERATION: 'generation:',
};

export const createCompoundKey = (
  ck: keyof typeof cacheKeys,
  foreignKey: string | number
): string => {
  return `${cacheKeys[ck]}${foreignKey}`;
};

export default cache;
