import { NavLink, useNavigate } from "@solidjs/router";
import styles from '../styles/Header.module.css';
import clerk from "../auth/Auth";
import { createEffect, Show } from "solid-js";

export default function Header() {
  let userButtonDiv: HTMLDivElement;

  createEffect(() => {
    if (clerk.user) {
      if (userButtonDiv) clerk.mountUserButton(userButtonDiv);
    }
  });

  return (
    <div class={styles.container}>
      <h3>Booker</h3>
      <div class={styles.links}>
        <NavLink href="/home">
          Home
        </NavLink>
        <NavLink href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink href="/payment">
          Payment
        </NavLink>
        <Show when={clerk.user} fallback={<NavLink href="/sign-in">Sign in</NavLink>}>
          <div ref={(el) => (userButtonDiv = el as HTMLDivElement)}/>
        </Show>
      </div>
    </div>
  );
}
