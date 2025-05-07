import { NotebookType } from '@/types/ContentType';

export const data: NotebookType[] = [
	{
		id: 0,
		name: 'NaraBook n°1',
		iconColor: '#6666ff',
		iconName: 'school',
		content: [
			{
				folder: {
					name: 'Folder 1',
					id: 0,
					content: [
						{
							note: {
								name: 'Note 1',
								id: 0,
								tags: [
									{
										title: 'Learning',
										color: '#f9a',
									},
									{
										title: 'Entertainement',
										color: '#1ff',
									},
									{
										title: 'School',
										color: '#af0',
									},
									{
										title: 'Learning',
										color: '#af0',
									},
									{
										title: 'Learning',
										color: '#af0',
									},
								],
							},
						},
						{
							note: {
								name: 'Note 2',
								id: 1,
							},
						},
					],
				},
			},
			{
				folder: {
					name: 'Folder 2',
					id: 1,
					content: [
						{
							note: {
								name: 'Note 1',
								id: 0,
							},
						},
						{
							note: {
								name: 'Note 2',
								id: 1,
							},
						},
					],
				},
			},
			{
				folder: {
					name: 'Folder 3',
					id: 2,
					content: [
						{
							note: {
								name: 'Note 1',
								id: 0,
							},
						},
						{
							note: {
								name: 'Note 2',
								id: 1,
							},
						},
					],
				},
			},
			{
				folder: {
					name: 'Folder 4',
					id: 3,
				},
			},
		],
	},
	{
		id: 1,
		name: 'NaraBook n°2',
		iconColor: '#f2f940',
		iconName: 'book',
	},
	{
		id: 2,
		name: 'NaraBook n°3',
		iconColor: '#22ff7f',
		iconName: 'star',
	},
	{
		id: 3,
		name: 'NaraBook n°4',
		iconColor: '#ff6666',
		iconName: 'chess-knight',
	},
];
