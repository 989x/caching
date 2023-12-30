import { Request, Response } from 'express';
import redisClient from '../../config/redis.config';

export const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');
    res.json(keys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const value = await redisClient.get(key);
    res.json({ key, value });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const setKey = async (req: Request, res: Response) => {
  const { key, value } = req.body;
  try {
    await redisClient.set(key, value);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteKey = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await redisClient.del(key);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
