import express from 'express';
import helloRouter from './api/hello';
import stripeRouter from './api/stripe';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
// const port = process.env.PORT || 3000;
const port = 8080;

app.use(express.json());

// Serve static assets from the client build directory
app.use(express.static(path.join(__dirname, '../../dist/client')));

// Register the route handlers
app.use('/api', helloRouter);
app.use('/api', stripeRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  // console.log('route stack', app._router.stack)
});

// Last route to server index.html needed for client routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
