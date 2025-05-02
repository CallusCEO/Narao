export interface NoteType {
	name: string;
	id: `nt${number}`;
}

export interface FolderType {
	name: string;
	id: `fd${number}`;
	content?: ContentType;
}

export interface NotebookType {
	name: string;
	id: `nb${number}`;
	content?: ContentType;
}

export interface ContentType {
	folders?: FolderType[];
	notes?: NoteType[];
}
