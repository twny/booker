import Clerk from "@clerk/clerk-js";
import type { Component } from 'solid-js';
import { createEffect, onCleanup } from 'solid-js';
import booker from '../assets/booker.png';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../styles/Main.module.css';

const clerkPubKey = "pk_test_cHJlY2lvdXMtcmVwdGlsZS0zMy5jbGVyay5hY2NvdW50cy5kZXYk";
const clerk = new Clerk(clerkPubKey);
await clerk.load();

const stripePubKey = "pk_test_51NfHxfHQS950sEYD8Fnfv4n0fQ6SP81MsBXNdDiNlSg6I3nly0NnNWX3E0uXKpox0ZaaJzh8p1fKA8CDJLkZdMmo00rvRSe4QC";
const stripePromise = loadStripe(stripePubKey);

const Main: Component = () => {
    let stripe: any;
    let elements: any;
    let card: any;
    let cardDiv: HTMLDivElement;
    let signInDiv: HTMLDivElement;
    let signUpDiv: HTMLDivElement;

    const initializeStripe = async () => {
        stripe = await stripePromise;
        elements = stripe.elements();

        card = elements.create('card');
        card.mount(cardDiv);
    };

    const handlePayment = async () => {
        if (clerk.user) {
            const { paymentIntent } = await fetch("").then(res => res.json());
            stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: clerk.user.firstName + ' ' + clerk.user.lastName,
                    },
                },
            });
        }
    };

    createEffect(() => {
        initializeStripe();

        onCleanup(() => {
            if (card) {
                card.destroy();
            }
        });
    });

    return (
        <div class={styles.Main}>
            <img src={booker} alt="Booker" />
            <header class={styles.header}>Hey</header>
            {clerk.user ? (
                <>
                    <div ref={(el) => cardDiv = el as HTMLDivElement}></div>
                    <button onclick={handlePayment}>
                        Pay with Card
                    </button>
                </>
            ) : (
                <>
                    <div ref={(el) => (signInDiv = el as HTMLDivElement)}></div>
                    <div ref={(el) => (signUpDiv = el as HTMLDivElement)}></div>
                </>
            )}
        </div>
    );
};

export default Main;
