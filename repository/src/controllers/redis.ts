import { Request, Response } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

const redisController = {
  getAllKeys: async (req: Request, res: Response) => {
    try {
      const keys = await redis.keys('*');
      res.json(keys);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getKey: async (req: Request, res: Response) => {
    const { key } = req.params;
    try {
      const value = await redis.get(key);
      res.json({ key, value });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  setKey: async (req: Request, res: Response) => {
    const { key, value } = req.body;
    try {
      await redis.set(key, value);
      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteKey: async (req: Request, res: Response) => {
    const { key } = req.params;
    try {
      await redis.del(key);
      res.json({ success: true });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default redisController;
