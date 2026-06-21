let feedbackId = 0

export function createFloatingText({ text, x, y, variant = 'success' }) {
	return {
		id: feedbackId++,
		text,
		x,
		y,
		variant,
		age: 0,
		lifetime: 0.7,
	}
}
