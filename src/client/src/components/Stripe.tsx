import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import { loadStripe } from '@stripe/stripe-js';

import styles from '../styles/Stripe.module.css';

const stripePubKey = "pk_test_51NfHxfHQS950sEYD8Fnfv4n0fQ6SP81MsBXNdDiNlSg6I3nly0NnNWX3E0uXKpox0ZaaJzh8p1fKA8CDJLkZdMmo00rvRSe4QC";
let stripePromise = loadStripe(stripePubKey);
let stripe: any;
let card: any;
let elements: any;

const Stripe: Component = () => {
  let cardDiv: HTMLDivElement;

  onMount(async () => {
    stripe = await stripePromise;
    elements = stripe.elements();

    // Create the card element
    card = elements.create('card');
    card.mount(cardDiv);
  });

  onCleanup(() => {
    if (card) card.unmount();
  });

  return (
    <div class={styles.stripeContainer}>
      <h2>Payment Information</h2>
      <div ref={(el) => (cardDiv = el as HTMLDivElement)} class={styles.cardElement} />
    </div>
  );
};

export default Stripe;
