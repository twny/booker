import express from 'express';
import helloRouter from './api/hello';
import register from './api/register';
import login from './api/login';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Register the route handlers
app.use('/api', helloRouter);
app.use('/api', register);
app.use('/api', login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('route stack', app._router.stack)
});
