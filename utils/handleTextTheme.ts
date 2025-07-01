import COLORS from '@/constants/COLORS';

export const handleTextTheme = (color: `#${string}`) => {
	const symbols = {
		'0': 0,
		'1': 1,
		'2': 2,
		'3': 3,
		'4': 4,
		'5': 5,
		'6': 6,
		'7': 7,
		'8': 8,
		'9': 9,
		a: 10,
		b: 11,
		c: 12,
		d: 13,
		e: 14,
		f: 15,
	};

	const rawColor = color.trim().slice(1, 6);
	const colorAsList = rawColor.split('');

	let score = 0;

	// multiply score by 3 if there were only 3 characters :
	score = rawColor.length === 3 ? score * 2 : score;

	// Return a color based on the score :
	return score > 35 ? COLORS.dark.primary : COLORS.light.primary;
};
