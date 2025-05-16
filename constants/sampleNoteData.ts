import { NotebookType } from '@/types/ContentType';

export const data: NotebookType[] = [
	{
		id: 2,
		name: 'Project Atlas',
		iconColor: '#22ff7f',
		iconName: 'map',
		content: [
			{
				folder: {
					id: 5,
					name: 'Research',
					content: [
						{
							note: {
								id: 12,
								name: 'Gather sources',
								tags: [
									{ title: 'Priority', color: '#ff4444' },
									{ title: 'Research', color: '#4444ff' },
								],
							},
						},
						{
							note: {
								id: 13,
								name: 'Competitor Analysis',
								tags: [{ title: 'Market', color: '#ffcc00' }],
							},
						},
						{
							note: {
								id: 14,
								name: 'Scientific Review',
								tags: [{ title: 'Verified', color: '#00ccff' }],
							},
						},
						{
							folder: {
								id: 6,
								name: 'Interviews',
								content: [
									{
										note: { id: 15, name: 'User A', tags: [] },
									},
									{
										note: {
											id: 16,
											name: 'User B',
											tags: [{ title: 'Follow-Up', color: '#ffaa00' }],
										},
									},
									{
										note: {
											id: 17,
											name: 'Expert Z',
											tags: [{ title: 'Expertise', color: '#9933ff' }],
										},
									},
									{
										folder: {
											id: 7,
											name: 'Tech Interviews',
											content: [
												{
													folder: {
														id: 8,
														name: 'Frontend',
														content: [],
													},
												},
												{
													folder: {
														id: 9,
														name: 'Backend',
														content: [],
													},
												},
											],
										},
									},
									{
										folder: {
											id: 10,
											name: 'Marketing Interviews',
											content: [
												{
													folder: {
														id: 11,
														name: 'Social Media',
														content: [],
													},
												},
												{
													folder: {
														id: 12,
														name: 'SEO',
														content: [
															{
																folder: {
																	id: 10,
																	name: 'Marketing Interviews',
																	content: [],
																},
															},
														],
													},
												},
											],
										},
									},
								],
							},
						},
					],
				},
			},
			{
				folder: {
					id: 7,
					name: 'Drafts',
					content: [
						{
							note: {
								id: 18,
								name: 'Chapter 1',
								tags: [{ title: 'Writing', color: '#00cc99' }],
							},
						},
						{
							note: {
								id: 19,
								name: 'Chapter 2',
								tags: [{ title: 'Draft', color: '#00cc99' }],
							},
						},
						{
							note: {
								id: 20,
								name: 'Chapter 3',
								tags: [{ title: 'Revision', color: '#0099cc' }],
							},
						},
					],
				},
			},
			{
				folder: {
					id: 8,
					name: 'Planning',
					content: [
						{
							note: {
								id: 21,
								name: 'Timeline',
								tags: [{ title: 'Schedule', color: '#9966ff' }],
							},
						},
						{
							note: {
								id: 22,
								name: 'Objectives',
								tags: [{ title: 'Goals', color: '#3399ff' }],
							},
						},
					],
				},
			},
			{
				folder: { id: 9, name: 'Miscellaneous', content: [] },
			},
		],
	},
	{
		id: 0,
		name: 'NaraBook n°1',
		iconColor: '#6666ff',
		iconName: 'school',
		content: [
			{
				folder: {
					id: 0,
					name: 'Folder Alpha',
					content: [
						{
							note: {
								id: 0,
								name: 'Alpha Note',
								tags: [{ title: 'Learning', color: '#f9a' }],
							},
						},
						{
							note: {
								id: 1,
								name: 'Beta Note',
								tags: [
									{ title: 'School', color: '#af0' },
									{ title: 'Urgent', color: '#ff0000' },
								],
							},
						},
						{
							note: {
								id: 2,
								name: 'Gamma Note',
								tags: [{ title: 'Revision', color: '#f0f' }],
							},
						},
						{
							note: {
								id: 3,
								name: 'Delta Note',
								tags: [{ title: 'Homework', color: '#0ff' }],
							},
						},
					],
				},
			},
			{
				folder: {
					id: 1,
					name: 'Folder Beta',
					content: [
						{
							note: {
								id: 4,
								name: 'Epsilon Note',
								tags: [{ title: 'Math', color: '#ff6600' }],
							},
						},
						{
							note: {
								id: 5,
								name: 'Zeta Note',
								tags: [{ title: 'Physics', color: '#66ff66' }],
							},
						},
						{
							note: {
								id: 6,
								name: 'Eta Note',
								tags: [{ title: 'Chemistry', color: '#ff6699' }],
							},
						},
					],
				},
			},
			{
				folder: { id: 2, name: 'Folder Gamma', content: [] },
			},
			{
				folder: {
					id: 3,
					name: 'Folder Delta',
					content: [
						{
							note: {
								id: 7,
								name: 'Theta Note',
								tags: [{ title: 'Biology', color: '#99ffcc' }],
							},
						},
						{
							note: {
								id: 8,
								name: 'Iota Note',
								tags: [{ title: 'Geography', color: '#ccccff' }],
							},
						},
					],
				},
			},
			{
				folder: { id: 4, name: 'Folder Epsilon', content: [] },
			},
		],
	},
	{
		id: 3,
		name: 'Ideas Vault',
		iconColor: '#ff6666',
		iconName: 'lightbulb',
		content: [
			{
				note: {
					id: 9,
					name: 'Brainstorm session',
					tags: [{ title: 'Creativity', color: '#ff66cc' }],
				},
			},
			{
				folder: {
					id: 10,
					name: 'Sketches',
					content: [
						{ note: { id: 10, name: 'Logo draft', tags: [] } },
						{
							note: {
								id: 11,
								name: 'UI Mockup',
								tags: [{ title: 'Design', color: '#33ccff' }],
							},
						},
						{
							note: {
								id: 12,
								name: 'Wireframe',
								tags: [{ title: 'UX', color: '#ffcc33' }],
							},
						},
					],
				},
			},
			{
				folder: {
					id: 11,
					name: 'Concepts',
					content: [
						{
							note: {
								id: 13,
								name: 'New App Idea',
								tags: [{ title: 'Startup', color: '#ccff00' }],
							},
						},
						{
							note: {
								id: 14,
								name: 'Gamification',
								tags: [{ title: 'Engagement', color: '#ff9966' }],
							},
						},
					],
				},
			},
			{
				folder: { id: 12, name: 'Random Thoughts', content: [] },
			},
		],
	},
	{
		id: 1,
		name: 'NaraBook n°2',
		iconColor: '#f2f940',
		iconName: 'book',
		content: [
			{
				folder: {
					id: 13,
					name: 'Reading List',
					content: [
						{
							note: {
								id: 15,
								name: 'Book 1',
								tags: [{ title: 'Fiction', color: '#cc0099' }],
							},
						},
						{
							note: {
								id: 16,
								name: 'Book 2',
								tags: [{ title: 'Non-Fiction', color: '#3366cc' }],
							},
						},
						{
							note: {
								id: 17,
								name: 'Book 3',
								tags: [{ title: 'Memoir', color: '#cc3333' }],
							},
						},
					],
				},
			},
			{
				folder: { id: 14, name: 'Summaries', content: [] },
			},
			{
				folder: {
					id: 15,
					name: 'Notes Archive',
					content: [
						{
							note: {
								id: 18,
								name: 'Summary A',
								tags: [{ title: 'Archived', color: '#999999' }],
							},
						},
						{
							note: {
								id: 19,
								name: 'Summary B',
								tags: [{ title: 'Archived', color: '#999999' }],
							},
						},
					],
				},
			},
		],
	},
];
