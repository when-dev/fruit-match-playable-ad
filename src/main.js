import './style.css';
import { GAME_CONFIG } from './game/config.js';
import { Game } from './game/game.js';

function setupGameViewport() {
	const isMobile =
		window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 430;

	if (!isMobile) {
		GAME_CONFIG.width = 390;
		GAME_CONFIG.height = 844;

		document.documentElement.style.setProperty('--game-width', '390px');
		document.documentElement.style.setProperty('--game-height', '844px');

		return;
	}

	const viewportWidth = window.innerWidth;
	const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

	GAME_CONFIG.width = viewportWidth;
	GAME_CONFIG.height = viewportHeight;

	document.documentElement.style.setProperty('--game-width', `${viewportWidth}px`);
	document.documentElement.style.setProperty('--game-height', `${viewportHeight}px`);
	document.documentElement.classList.add('is-mobile-game');
}

setupGameViewport();

const app = document.querySelector('#app');

const game = new Game(app);
game.init();