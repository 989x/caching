import { Request, Response } from 'express';
import redisClient, { REDIS_CONFIG } from '../config/redis.config';
import { handleError } from '../helper/handling';

const { KEY_PREFIX, EXPIRATION_TIME } = REDIS_CONFIG;

export const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');
    
    res.json(keys);
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const getAppKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys(`${KEY_PREFIX}:*`); 

    res.json(keys);
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const getKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const cacheKey = `${KEY_PREFIX}:${key}`;
    const cachedValue = await redisClient.get(cacheKey);

    if (cachedValue) {
      const parsedValue = JSON.parse(cachedValue); 
      res.json({ key, value: parsedValue });
    } else {
      res.json({ key, value: null });
    }
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const setKey = async (req: Request, res: Response) => {
  const { key, value } = req.body;
  try {
    const cacheKey = `${KEY_PREFIX}:${key}`;
    await redisClient.setEx(cacheKey, EXPIRATION_TIME, JSON.stringify(value));

    res.json({ success: true });
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await redisClient.del(`${KEY_PREFIX}:${key}`);

    res.json({ success: true });
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};
