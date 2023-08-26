
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/users', (req: Request, res: Response) => {
  console.log('body', req.body)
  res.send('Hello, world! hey');
});

export default router;
