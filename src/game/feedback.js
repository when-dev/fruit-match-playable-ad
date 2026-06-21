let feedbackId = 0;

export function createFloatingText({ text, x, y }) {
	return {
		id: feedbackId++,
		text,
		x,
		y,
		age: 0,
		lifetime: 0.7,
	}
}