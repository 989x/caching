import express from 'express';
import * as redis from '../controllers/redis.controller';

const router = express.Router();

router.get('/all-keys', redis.getAllKeys);

router.get('/get/:entity', redis.getEntityKeys);

router.get('/get/:entity/:key', redis.getKey);

router.post('/set/:entity/:key', redis.setKey);

router.delete('/delete/:entity/:key', redis.deleteKey);

export default router;
