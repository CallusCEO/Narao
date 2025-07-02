import { AllAIModelsType } from '@/types/allAIModelsType';
import React, { createContext, ReactNode, useState } from 'react';

// Define the context type
interface CurrentModelType {
	model: AllAIModelsType;
	setModel: React.Dispatch<React.SetStateAction<AllAIModelsType>>;
}

// Create the context with default values
export const CurrentModelContext = createContext<CurrentModelType>({
	model: 'gemini-2.0-flash-lite',
	setModel: () => {},
});

// Create a provider component
export const CurrentModelProvider = ({ children }: { children: ReactNode }) => {
	const [model, setModel] = useState<AllAIModelsType>('gemini-2.0-flash-lite');

	return (
		<CurrentModelContext.Provider value={{ model, setModel }}>
			{children}
		</CurrentModelContext.Provider>
	);
};
