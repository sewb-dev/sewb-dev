import { Redis } from 'ioredis';
import envVariables from './env';

const cache = new Redis({
  port: Number(envVariables.getEnv('REDIS_PORT')),
  host: envVariables.getEnv('REDIS_HOST'),
  password: envVariables.getEnv('REDIS_PASSWORD'),
  username: envVariables.getEnv('REDIS_USERNAME'),
});

cache.on('error', (error) => {
  console.error(`CACHE: FAILED TO CONNECT TO THE CACHE.`);
  console.error(`CACHE: ${JSON.stringify(error)}`);
  process.exit(1);
});

cache.on('connect', () => console.info('CACHE: connected successfuly...'));

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
