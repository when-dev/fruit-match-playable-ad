import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="ad">
    <section class="game-card">
      <div class="hero">
        <p class="eyebrow">HTML5 PLAYABLE AD</p>

        <h1 class="title">
          Catch the Fruits!
        </h1>

        <p class="description">
          Tap the fruits, collect points and unlock the reward.
        </p>

        <button class="play-button" type="button">
          Start Game
        </button>
      </div>
    </section>
  </main>
`;