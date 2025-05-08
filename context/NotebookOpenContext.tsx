import React, { createContext, ReactNode, useState } from 'react';

// Define the type for the color scheme
type NotebookOpenType = boolean;

// Define the context type
interface NotebookOpenContextType {
	isNotebookOpen: NotebookOpenType;
	setNotebookOpen: React.Dispatch<React.SetStateAction<NotebookOpenType>>;
}

// Create the context with default values
export const NotebookOpenContext = createContext<NotebookOpenContextType>({
	isNotebookOpen: false,
	setNotebookOpen: () => {},
});

// Create a provider component
export const NotebookOpenProvider = ({ children }: { children: ReactNode }) => {
	const [isNotebookOpen, setNotebookOpen] = useState<NotebookOpenType>(false);

	return (
		<NotebookOpenContext.Provider value={{ isNotebookOpen, setNotebookOpen }}>
			{children}
		</NotebookOpenContext.Provider>
	);
};
