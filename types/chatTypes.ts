export interface Message {
	id: number;
	text: string;
	role: 'user' | 'model';
}

export interface ChatType {
	id: number;
	title: string;
	date: string;
	data: Message[];
}
