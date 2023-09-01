import express from 'express';
import helloRouter from './api/hello';
import stripeRouter from './api/stripe';
import usersRouter from './api/users';
import dotenv from 'dotenv';
import path from 'path';
import {LooseAuthProp} from "@clerk/clerk-sdk-node";

dotenv.config();

const app = express();

// needed for clerks auth middleware
declare global {
  namespace Express {
    interface Request extends LooseAuthProp {
    }
  }
}

const port = 8080;
app.use(express.json());

// Serve static assets from the client build directory
app.use(express.static(path.join(__dirname, '../../dist/client')));

// Register the route handlers
app.use('/api', helloRouter);
app.use('/api', stripeRouter);
app.use('/api', usersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  // console.log('route stack', app._router.stack)
});

// Last route to server index.html needed for client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
});
