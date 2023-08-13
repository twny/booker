import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  // Ensure email and password are strings
  if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

export default router;
