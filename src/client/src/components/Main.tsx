import Clerk from "@clerk/clerk-js";
import type { Component } from 'solid-js';
import { createEffect } from 'solid-js';
import  Stripe from './Stripe';
import booker from '../assets/booker.png';

import styles from '../styles/Main.module.css';

const publishableKey = "pk_test_cHJlY2lvdXMtcmVwdGlsZS0zMy5jbGVyay5hY2NvdW50cy5kZXYk";
const clerk = new Clerk(publishableKey);
await clerk.load({
  // Set load options here...
});

const Main: Component = () => {
  let signInDiv: HTMLDivElement;
  let signUpDiv: HTMLDivElement;
  let userButtonDiv: HTMLDivElement;

  // Mount the appropriate components based on the user's sign-in status
  createEffect(() => {
    if (clerk.user) {
      // If the user is signed in, mount the UserButton
      if (userButtonDiv) clerk.mountUserButton(userButtonDiv);
    } else {
      // If the user is not signed in, mount the sign-in and sign-up components
      if (signInDiv) clerk.mountSignIn(signInDiv);
      if (signUpDiv) clerk.mountSignUp(signUpDiv);
    }
  });

  return (
    <div class={styles.Main}>
      <img src={booker} alt="Booker" />
      <header class={styles.header}>Hey</header>
      {clerk.user ? (
        <>
          <div ref={(el) => (userButtonDiv = el as HTMLDivElement)} />
          <Stripe />
        </>
      ) : (
        <>
          <div ref={(el) => (signInDiv = el as HTMLDivElement)} /> {/* This div will contain the sign-in component */}
          <div ref={(el) => (signUpDiv = el as HTMLDivElement)} /> {/* This div will contain the sign-up component */}
          <Stripe />
        </>
      )}
    </div>
  );
};

export default Main;
