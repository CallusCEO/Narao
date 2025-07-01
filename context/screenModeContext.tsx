import React, { createContext, ReactNode, useState } from 'react';

// Define the context type
interface ScreenModeContextType {
	mode: 'ai' | 'notes';
	setMode: React.Dispatch<React.SetStateAction<'ai' | 'notes'>>;
}

// Create the context with default values
export const ScreenModeContext = createContext<ScreenModeContextType>({
	mode: 'ai',
	setMode: () => {},
});

// Create a provider component
export const ScreenModeProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<'ai' | 'notes'>('ai');

	return (
		<ScreenModeContext.Provider value={{ mode, setMode }}>
			{children}
		</ScreenModeContext.Provider>
	);
};
