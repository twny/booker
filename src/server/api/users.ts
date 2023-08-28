import {Request, Response, Router} from 'express';
import {clerkClient, ClerkExpressWithAuth, WithAuthProp} from '@clerk/clerk-sdk-node';
import "dotenv/config";
import {prisma} from "../db";

const router = Router();
router.use(ClerkExpressWithAuth());

router.post('/users',
  async (req: WithAuthProp<Request>, res: Response) => {
    if (!req.auth?.userId) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }

    // we retrieve the userinfo ourselves to prevent (maliciously) wrong data
    const clerkUser = await clerkClient.users.getUser(req.auth.userId);
    if (!clerkUser?.username) {
      console.error("User or username not found at clerk", clerkUser)
      res.status(500).send({error: 'Something went wrong'});
      return;
    }

    const user = await prisma.users.findUnique({
      where: {
        clerkId: req.auth.userId
      }
    })
    if (!user) {
      await prisma.users.create({
        data: {
          clerkId: req.auth.userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          handle: clerkUser.username
        }
      })
      res.status(201)
      return;
    }

    res.status(409).send({error: 'User already exists'});
  });
export default router;
