import { Request, Response } from 'express';
import redisClient, { REDIS_CONFIG } from '../config/redis.config';

const { KEY_PREFIX, EXPIRATION_TIME } = REDIS_CONFIG;

export const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');
    res.json(keys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAppKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys(`${KEY_PREFIX}:*`); 

    res.json(keys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const value = await redisClient.get(`${KEY_PREFIX}:${key}`);

    res.json({ key, value });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const setKey = async (req: Request, res: Response) => {
  const { key, value } = req.body;
  try {
    const cacheKey = `${KEY_PREFIX}:${key}`;
    await redisClient.setEx(cacheKey, EXPIRATION_TIME, JSON.stringify(value));

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await redisClient.del(`${KEY_PREFIX}:${key}`);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
