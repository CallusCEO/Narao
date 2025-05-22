import { NoteType } from '@/types/ContentType';

interface Props extends NoteType {
	notebookParent: string;
	words: number;
	lastEdited: string;
}

export const dataHistory: Props[] = [
	{
		id: 1,
		name: 'Gather sources of the Island',
		tags: [
			{ title: 'Priority', color: '#ff4444' },
			{ title: 'Research', color: '#4444ff' },
		],
		notebookParent: 'Project Atlas',
		words: 255,
		lastEdited: '2h ago',
	},
	{
		id: 2,
		name: 'Gather sources',
		tags: [
			{ title: 'Priority', color: '#fff' },
			{ title: 'Research', color: '#4444ff' },
		],
		notebookParent: 'Project Atlas',
		words: 255,
		lastEdited: '2h ago',
	},
	{
		id: 3,
		name: 'Gather sources',
		tags: [
			{ title: 'Priority', color: '#ff80fe' },
			{ title: 'Research', color: '#4444ff' },
		],
		notebookParent: 'Project Atlas',
		words: 255,
		lastEdited: '2h ago',
	},
];
