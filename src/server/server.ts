import express from 'express';
import helloRouter from './api/hello';
import stripeRouter from './api/stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Register the route handlers
app.use('/api', helloRouter);
app.use('/api', stripeRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  // console.log('route stack', app._router.stack)
});
