import React, { createContext, ReactNode, useState } from 'react';

// Define the type for the color scheme
type ChatDrawerOpenType = boolean;

// Define the context type
interface ChatDrawerContextType {
	isChatDrawerOpen: ChatDrawerOpenType;
	setChatDrawerOpen: React.Dispatch<React.SetStateAction<ChatDrawerOpenType>>;
}

// Create the context with default values
export const ChatDrawerOpenContext = createContext<ChatDrawerContextType>({
	isChatDrawerOpen: false,
	setChatDrawerOpen: () => {},
});

// Create a provider component
export const ChatDrawerOpenProvider = ({ children }: { children: ReactNode }) => {
	const [isChatDrawerOpen, setChatDrawerOpen] = useState<ChatDrawerOpenType>(false);

	return (
		<ChatDrawerOpenContext.Provider value={{ isChatDrawerOpen, setChatDrawerOpen }}>
			{children}
		</ChatDrawerOpenContext.Provider>
	);
};
