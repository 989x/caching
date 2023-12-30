import express, { Router } from 'express';
import redisController from '../controllers/redis';

const router: Router = express.Router();

router.get('/keys', redisController.getAllKeys);
router.get('/get/:key', redisController.getKey);
router.post('/set', redisController.setKey);
router.delete('/delete/:key', redisController.deleteKey);

export default router;
