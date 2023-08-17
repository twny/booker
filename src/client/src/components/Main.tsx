import { Component } from 'solid-js';
import  Stripe from './Stripe';
import ClerkComponent from './Clerk';
import booker from '../assets/booker.png';

import styles from '../styles/Main.module.css';

const Main: Component = () => {
  return (
    <div class={styles.Main}>
      <img src={booker} alt="Booker" />
      <header class={styles.header}>Hey</header>
      <ClerkComponent />
      <Stripe />
    </div>
  );
};

export default Main;
