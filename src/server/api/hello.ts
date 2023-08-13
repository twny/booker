import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello, world! hey');
});

export default router;
