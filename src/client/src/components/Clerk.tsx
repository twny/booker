import Clerk from "@clerk/clerk-js";
import { createEffect, onCleanup } from 'solid-js';
import type { Component } from 'solid-js';

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

  createEffect(() => {
    if (clerk.user) {
      if (userButtonDiv) clerk.mountUserButton(userButtonDiv);
    } else {
      if (signInDiv) clerk.mountSignIn(signInDiv);
      if (signUpDiv) clerk.mountSignUp(signUpDiv);
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
          <div ref={(el) => (signInDiv = el as HTMLDivElement)} class={styles.signIn} />
          <div ref={(el) => (signUpDiv = el as HTMLDivElement)} class={styles.signUp} />
        </>
      )}
    </>
  );
};

export default ClerkComponent;
