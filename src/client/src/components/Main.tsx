import { Component, createSignal } from 'solid-js';
import Stripe from './Stripe';
import ClerkComponent from './Clerk';
import booker from '../assets/booker.png';
import homies from '../assets/homies.png';

import styles from '../styles/Main.module.css';

const Main: Component = () => {
  // Create a piece of reactive state to manage the image visibility
  const [showHomies, setShowHomies] = createSignal(false);

  const allMyHomies = () => {
    setShowHomies(!showHomies()); // Toggle the state
  }

  return (
    <div class={styles.Main}>
      <img src={booker} alt="Booker" />
      <button onclick={allMyHomies} class={styles.header}>Who is using booker?</button>
      
      {/* Conditionally render the image based on the state */}
      {showHomies() && <img src={homies} alt="homies"/>}

      <ClerkComponent />
      <Stripe />
    </div>
  );
};

export default Main;
