import { GAME_CONFIG } from './config'

export const GAME_STATUS = {
	INTRO: 'intro',
	PLAYING: 'playing',
	WIN: 'win',
	LOSE: 'lose',
};

export function createInitialState() {
	return {
		status: GAME_STATUS.INTRO,

		score: 0,
		lives: GAME_CONFIG.initialLives,
		timeLeft: GAME_CONFIG.duration,

		basket: {
			x: GAME_CONFIG.width / 2 - GAME_CONFIG.basket.width / 2,
			y: GAME_CONFIG.height - GAME_CONFIG.basket.bottom - GAME_CONFIG.basket.height,
			width: GAME_CONFIG.basket.width,
			height: GAME_CONFIG.basket.height,
		},

		entities: [],
		particles: [],

		lastTime: 0,
		spawnTimer: 0,
	};
}