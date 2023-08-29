import { useNavigate, useParams } from "@solidjs/router";
import clerk, { createUser } from "../auth/Auth";
import { createEffect, Show } from "solid-js";
import styles from "../styles/Clerk.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const params = useParams();
  let signUpDiv: HTMLDivElement;

  if (clerk.user && params.success === "true") {
    createUser(clerk.user.id, clerk.user.primaryEmailAddress?.emailAddress)
  }
  createEffect(() => {
    if (clerk.user) {
      navigate("/home", {replace: true});
    } else {
      if (signUpDiv) clerk.mountSignUp(signUpDiv);
    }
  });

  return (
    <>
      <Show when={!clerk.user} fallback={<div>Redirecting...</div>}>
        <div class={styles.authContainer}>
          <div ref={(el) => (signUpDiv = el as HTMLDivElement)} />
        </div>
      </Show>
    </>
  );
}

export default SignUp