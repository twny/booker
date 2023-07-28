import type { Component } from 'solid-js';

import styles from '../styles/Main.module.css';

const Main: Component = () => {
  return (
    <div class={styles.Main}>
      <header class={styles.header}>
        Hey
      </header>
    </div>
  );
};

export default Main;
