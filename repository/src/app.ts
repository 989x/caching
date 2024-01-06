import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import redisRoutes from './routes/redis';
import { redisConnect } from './configs/redis';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/redis', redisRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, this is your Express server!' });
});

async function startServer() {
  try {
    // Connect to Redis
    await redisConnect();
    console.log('Connected to Redis');

    // Start Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1); // Exit process with non-zero code on failure
  }
}

// Export app for testing purposes
export default app;

// Start server only if script is run directly
if (require.main === module) {
  startServer();
}
