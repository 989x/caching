import express, { Router } from 'express';
import * as redis from '../controllers/redis';

const router: Router = express.Router();

router.get('/keys', redis.getAllKeys);
router.get('/get/:key', redis.getKey);
router.post('/set', redis.setKey);
router.delete('/delete/:key', redis.deleteKey);

export default router;
