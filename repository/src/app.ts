import express from 'express';
import bodyParser from 'body-parser';
import redisRoutes from './routes/redis';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/redis', redisRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
