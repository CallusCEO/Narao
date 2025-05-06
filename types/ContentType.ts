export interface NoteType {
	name: string;
	id: number;
}

export interface FolderType {
	name: string;
	id: number;
	content?: ContentType[];
}

export interface NotebookType {
	name: string;
	id: number;
	content?: ContentType[];
	iconColor: string;
	iconName: string;
}

export interface ContentType {
	folder?: FolderType;
	note?: NoteType;
}
