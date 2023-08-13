import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  res.json({ token });
});

export default router;
