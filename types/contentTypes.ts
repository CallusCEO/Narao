export interface TagType {
	title: string;
	color: `#${string}`;
}

export interface NoteType {
	name: string;
	id: number;
	tags?: TagType[];
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
