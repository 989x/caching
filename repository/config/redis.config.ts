import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config(); 

const redisUrl = process.env.NODE_ENV === 'production'
  ? process.env.REDIS_URL_PROD
  : process.env.REDIS_URL_DEV;

const redisClient = createClient({ url: redisUrl });
console.log('Redis URL:', redisUrl);

redisClient.on('error', (err) => {
  console.log('Redis Error', err);
});

export function redisConnect() {
  return redisClient.connect();
}

export default redisClient;
