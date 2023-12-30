import express from 'express';
import redisRoutes from './routes/redis.routes';
import { redisConnect } from '../config/redis.config';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/redis', redisRoutes);

async function startServer() {
  try {
    // Connect to Redis
    await redisConnect();
    console.log('Connected to Redis');

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1); // Exit the process with a non-zero code on failure
  }
}

startServer();
