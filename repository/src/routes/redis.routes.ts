import express, { Router } from 'express';
import * as redis from '../controllers/redis.controller';

const router: Router = express.Router();

router.get('/all-keys', redis.getAllKeys);
router.get('/app-keys', redis.getAppKeys);
router.get('/get/:key', redis.getKey);
router.post('/set', redis.setKey);
router.delete('/delete/:key', redis.deleteKey);

export default router;
