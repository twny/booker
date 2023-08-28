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

  createEffect(() => {
    if (clerk.user) {
      console.log("process userr create effect")
      // Send user data to backend to determine the next steps
      processUser(clerk.user.id, clerk.user.primaryEmailAddress?.emailAddress);
    }
  });

  onCleanup(() => {
    // Perform any cleanup tasks if necessary
  });

  async function processUser(userId: string, email: string | undefined) {
    console.log("hellllooooo in processUser")
    // TODO: Header with bearer token is only needed in dev mode (some cors issue), maybe there is a better way to do this
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${await clerk.session?.getToken()}`},
      body: JSON.stringify({userId: userId, email: email})
    });

    if (response.status === 201) {
      // TODO: do something useful here
      console.log("User created")

    } else if (response.status === 409) {
      console.log("User already exists")
    }
  }


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
