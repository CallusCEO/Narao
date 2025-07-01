export interface ChatType {
	id: number;
	title: string;
	date: string;
	data: {
		id: number;
		text: string;
		role: 'user' | 'ai';
	}[];
}
