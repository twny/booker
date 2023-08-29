import { createSignal, Show } from "solid-js";
import styles from "../styles/Home.module.css";
import booker from "../assets/booker.png";
import homies from "../assets/homies.png";
import { useNavigate } from "@solidjs/router";
import Header from "../components/Header";
import clerk from "../auth/Auth";

const Home = () => {
  const [showHomies, setShowHomies] = createSignal(false);
  const navigate = useNavigate();
  const allMyHomies = () => {
    setShowHomies(!showHomies());
  }
  const signUp = () => {
    navigate("/sign-up");
  }

  return (
    <>
      <Header/>
      <div class={styles.Home}>
        <img src={booker} alt="Booker"/>
        <div>
          <button onclick={allMyHomies} class={styles.header}>Who is using booker?</button>
          <Show when={!clerk.user}>
            <button onclick={signUp} class={styles.ctaButton}>Join</button>
          </Show>
        </div>
        {showHomies() && <img src={homies} alt="homies"/>}
      </div>
    </>
  )
}

export default Home;