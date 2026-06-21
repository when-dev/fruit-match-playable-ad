export const GAME_CONFIG = {
	width: 390,
	height: 844,

	duration: 45,
	targetScore: 300,
	initialLives: 3,

	basket: {
		width: 92,
		height: 54,
		bottom: 42,
	},

	fruit: {
		minSize: 36,
		maxSize: 52,
		minSpeed: 140,
		maxSpeed: 260,
		spawnInterval: 900,
		points: 10,
	},

	bomb: {
		size: 46,
		speed: 230,
		damage: 1,
	},
};
