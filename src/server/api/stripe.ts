import express from "express";
import Stripe from "stripe";

const stripe = new Stripe("your_stripe_secret_key", { apiVersion: '2022-11-15' }); // Replace with your actual Stripe secret key

const router = express.Router();

// api/payments
router.post("/payments", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Example amount in cents, e.g. $10.00
      currency: "usd",
    });

    res.json({ paymentIntent });
  } catch (err) {
    res.status(500).json({ error: "Unable to create payment intent" });
  }
});

export default router;
