import { useNavigate } from "@solidjs/router";
import clerk from "../auth/Auth";
import { createEffect, Show } from "solid-js";
import styles from "../styles/Clerk.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  let signInDiv: HTMLDivElement;

  createEffect(() => {
    if (clerk.user) {
      console.log("user already logged in");
      navigate("/home", {replace: true});
    } else {
      if (signInDiv) clerk.mountSignIn(signInDiv);
    }
  });

  return (
    <>
      <Show when={!clerk.user} fallback={<div>Redirecting...</div>}>
        <div class={styles.authContainer}>
          <div ref={(el) => (signInDiv = el as HTMLDivElement)}/>
        </div>
      </Show>
    </>
  );
}

export default SignIn