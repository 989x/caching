import { Request, Response } from 'express';
import redisClient, { REDIS_CONFIG } from '../configs/redis';
import { handleError } from '../helper/handling';

const { EXPIRATION_TIME } = REDIS_CONFIG;

export const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');

    res.json(keys);
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const getEntityKeys = async (req: Request, res: Response) => {
  const { entity } = req.params;
  try {
    const keys = await redisClient.keys(`${entity}:*`); 

    res.json(keys);
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const getKey = async (req: Request, res: Response) => {
  const { entity, key } = req.params;
  try {
    const cacheKey = `${entity}:${key}`;
    const cachedValue = await redisClient.get(cacheKey);

    if (cachedValue) {
      const parsedValue: any = JSON.parse(cachedValue);
      res.json({ key, value: parsedValue });
    } else {
      res.json({ key, value: null });
    }
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const setKey = async (req: Request, res: Response) => {
  const { entity, key } = req.params;
  const { value }: { value: any } = req.body;

  try {
    const cacheKey = `${entity}:${key}`;
    await redisClient.setEx(cacheKey, EXPIRATION_TIME, JSON.stringify(value));

    res.json({ success: true });
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const { entity, key } = req.params;
  try {
    const cacheKey = `${entity}:${key}`;
    await redisClient.del(cacheKey);

    res.json({ success: true });
  } catch (error) {
    handleError(res, error, 'Internal Server Error');
  }
};
