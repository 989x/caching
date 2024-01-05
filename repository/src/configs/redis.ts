import * as dotenv from 'dotenv'
import { createClient } from 'redis';

dotenv.config(); 

const redisUrl = process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL_PROD
  : process.env.REDIS_URL_DEV;

if (!redisUrl) {
  console.error('REDIS_URL_PROD or REDIS_URL_DEV is missing in the environment variables.');
  process.exit(1);
}

const redisClient = createClient({ url: redisUrl });
console.log('Redis URL:', redisUrl);

redisClient.on('error', (err) => {
  console.log('Redis Error', err);
});

export function redisConnect() {
  return redisClient.connect();
}

export default redisClient;

export const REDIS_CONFIG = {
  EXPIRATION_TIME: 6 * 60 * 60, // 6 hours in seconds
};
