import { createEffect, onCleanup, createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import Clerk from "@clerk/clerk-js";

import styles from '../styles/Clerk.module.css'; 

const publishableKey = "pk_test_cHJlY2lvdXMtcmVwdGlsZS0zMy5jbGVyay5hY2NvdW50cy5kZXYk";
const clerk = new Clerk(publishableKey);
await clerk.load({
  // Set load options here...
});

const ClerkComponent: Component = () => {
  let signInDiv: HTMLDivElement;
  let signUpDiv: HTMLDivElement;
  let userButtonDiv: HTMLDivElement;

  const [showSignUp, setShowSignUp] = createSignal(false); // By default, show the sign-in form

  createEffect(() => {
    if (clerk.user) {
      if (userButtonDiv) clerk.mountUserButton(userButtonDiv);
    } else {
      if (showSignUp()) {
        if (signUpDiv) clerk.mountSignUp(signUpDiv);
      } else {
        if (signInDiv) clerk.mountSignIn(signInDiv);
      }
    }
  });

  onCleanup(() => {
    // Perform any cleanup tasks if necessary
  });

  return (
    <>
      {clerk.user ? (
        <div ref={(el) => (userButtonDiv = el as HTMLDivElement)} />
      ) : (
        <>
          {showSignUp() ? (
            <>
              <div ref={(el) => (signUpDiv = el as HTMLDivElement)} class={styles.signUp} />
              <button onclick={() => setShowSignUp(false)}>Already have an account? Sign in!</button>
            </>
          ) : (
            <>
              <div ref={(el) => (signInDiv = el as HTMLDivElement)} class={styles.signIn} />
              <button onclick={() => setShowSignUp(true)}>Don't have an account? Sign up!</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ClerkComponent;
