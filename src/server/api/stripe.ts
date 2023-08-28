import express from 'express';
import Stripe from 'stripe';
import "dotenv/config";

const router = express.Router();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
    throw new Error("The STRIPE_SECRET_KEY environment variable is not set.");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

router.post('/payments', async (req, res) => {
  try {
    const { amount, currency } = req.body; // You should validate and sanitize these values

    // Create a new PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // This is in the smallest currency unit. For example, 1000 equals $10.00
      currency,
    });


    // DEBUG
    console.log('PaymentIntent created:', paymentIntent);  // Log the entire PaymentIntent object

    // Respond with the client secret and some other necessary details
    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).send({ error: 'Failed to create PaymentIntent' });
  }
});

export default router;
