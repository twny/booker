import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import { loadStripe } from '@stripe/stripe-js';

import styles from '../styles/Stripe.module.css';

const stripePubKey = "pk_test_51NfHxfHQS950sEYD8Fnfv4n0fQ6SP81MsBXNdDiNlSg6I3nly0NnNWX3E0uXKpox0ZaaJzh8p1fKA8CDJLkZdMmo00rvRSe4QC";
let stripePromise = loadStripe(stripePubKey);
let stripe: any;
let card: any;
let elements: any;

const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/payments' : '/api/payments';

const Stripe: Component = () => {
  let cardDiv: HTMLDivElement;

  onMount(async () => {
    stripe = await stripePromise;
    elements = stripe.elements();

    // Create the card element
    card = elements.create('card');
    card.mount(cardDiv);
  });

  const handlePaymentSubmit = async () => {
    // Request PaymentIntent from backend
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 1000, currency: 'usd' })  // Example amount and currency, adjust as needed
    });

    const paymentIntent = await response.json();

    // Confirm the payment using the client secret from the PaymentIntent
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: card,
      }
    });

    if (result.error) {
      console.error(result.error.message);
      // Handle error here
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
        // Handle successful payment here
      }
    }
  };

  onCleanup(() => {
    if (card) card.unmount();
  });

  return (
    <div class={styles.stripeContainer}>
      <h2>Payment Information</h2>
      <div ref={(el) => (cardDiv = el as HTMLDivElement)} class={styles.cardElement} />
      <button onclick={handlePaymentSubmit} class={styles.submitButton}>Submit Payment</button>
    </div>
  );
};

export default Stripe;
