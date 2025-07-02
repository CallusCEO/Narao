import { ChatType } from '@/types/chatTypes';

const LIST_CHATS: ChatType[] = [
	{
		id: 8,
		title: 'This is along title with plenty of words',
		date: '2025-01-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
			{
				id: 3,
				text: "I'm doing great, thank you! I'm actually working on a new feature for my app.",
				role: 'user',
			},
			{
				id: 4,
				text: 'That sounds exciting—tell me more about it.',
				role: 'ai',
			},
			{
				id: 5,
				text: 'I want to implement a live search that filters results as the user types.',
				role: 'user',
			},
			{
				id: 6,
				text: 'A live search is a fantastic UX enhancement. Which framework are you using?',
				role: 'ai',
			},
			{
				id: 7,
				text: "I'm building it in React with TypeScript, but I'm open to suggestions if you see any pitfalls.",
				role: 'user',
			},
			{
				id: 8,
				text: 'React and TS are solid choices. You’ll want to debounce your input to avoid flooding the API.',
				role: 'ai',
			},
			{
				id: 9,
				text: 'Good point—what debounce delay would you recommend?',
				role: 'user',
			},
			{
				id: 10,
				text: 'About 300ms is the sweet spot: fast enough to feel responsive, slow enough to save requests.',
				role: 'ai',
			},
			{
				id: 11,
				text: 'Makes sense. Should I use lodash.debounce or write my own utility?',
				role: 'user',
			},
			{
				id: 12,
				text: 'Lodash.debounce is battle‑tested, but writing your own is a great learning exercise.',
				role: 'ai',
			},
			{
				id: 13,
				text: "I'll try coding my own first and switch to lodash if I hit snags.",
				role: 'user',
			},
			{
				id: 14,
				text: 'Perfect approach—build your understanding before relying on external libraries.',
				role: 'ai',
			},
			{
				id: 15,
				text: 'Also thinking about error handling. Any tips for showing friendly messages when the API fails?',
				role: 'user',
			},
			{
				id: 16,
				text: 'Absolutely—use a banner or inline alert that suggests retrying and keeps the user informed.',
				role: 'ai',
			},
			{
				id: 17,
				text: 'Should I automatically retry the request once before showing the error?',
				role: 'user',
			},
			{
				id: 18,
				text: 'One retry is polite. Anything more might annoy the server and confuse users if it still fails.',
				role: 'ai',
			},
			{
				id: 19,
				text: 'Great advice. Lastly, any pointers on writing tests for this feature?',
				role: 'user',
			},
			{
				id: 20,
				text: 'Mock your debounce function and API calls—test both the timing logic and UI responses separately.',
				role: 'ai',
			},
			{
				id: 21,
				text: 'Thanks! I’ll set up unit tests for the debounce utility and integration tests for the component.',
				role: 'user',
			},
			{
				id: 22,
				text: "You're welcome! Keep me posted on your progress—I'm here to help if you hit any roadblocks.",
				role: 'ai',
			},
		],
	},
	{
		id: 7,
		title: 'Chat 2',
		date: '2025-03-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 6,
		title: 'Chat 3',
		date: '2025-05-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 5,
		title: 'Chat 4',
		date: '2025-06-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 4,
		title: 'Chat 5',
		date: '2025-07-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 3,
		title: 'Chat 6',
		date: '2025-08-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 2,
		title: 'Chat 7',
		date: '2025-09-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
	{
		id: 1,
		title: 'Chat 8',
		date: '2025-10-01',
		data: [
			{
				id: 1,
				text: 'Hello!',
				role: 'user',
			},
			{
				id: 2,
				text: 'Hello! How are you?',
				role: 'ai',
			},
		],
	},
];

export default LIST_CHATS;
