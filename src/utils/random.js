export function randomBetween(min, max) {
	return Math.random() * (max - min) + min
}

export function randomInt(min, max) {
	return Math.floor(randomBetween(min, max + 1))
}