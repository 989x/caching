import { Router } from 'express';
import * as redis from '../controllers/redis';
import * as auth from '../controllers/auth';

const router = Router();

router.get('/all-keys', auth.verifyToken, redis.getAllKeys);
router.get('/get/:entity', auth.verifyToken, redis.getEntityKeys);
router.get('/get/:entity/:key', auth.verifyToken, redis.getKey);
router.post('/set/:entity/:key', auth.verifyToken, redis.setKey);
router.delete('/delete/:entity/:key', auth.verifyToken, redis.deleteKey);

export default router;
