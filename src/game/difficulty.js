import { GAME_CONFIG } from './config'

export function getDifficulty(state) {
	const elapsedTime = GAME_CONFIG.duration - state.timeLeft;
	const progress = Math.min(elapsedTime / GAME_CONFIG.duration, 1);

	return {
		progress,
		spawnInterval: getSpawnInterval(progress),
		speedMultiplier: getSpeedMultiplier(progress),
		bombChance: getBombChance(progress),
	};
}

function getSpawnInterval(progress) {
	const startInterval = GAME_CONFIG.fruit.spawnInterval;
	const endInterval = 520;

	return startInterval - (startInterval - endInterval) * progress;
}

function getSpeedMultiplier(progress) {
	const startMultiplier = 1;
	const endMultiplier = 1.45;

	return startMultiplier + (endMultiplier - startMultiplier) * progress;
}

function getBombChance(progress) {
	const startChance = 0.15;
	const endChance = 0.35;

	return startChance + (endChance - startChance) * progress;
}