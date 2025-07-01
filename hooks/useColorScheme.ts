import { ColorSchemeContext } from '@/context/colorSchemeContext';
import { useContext } from 'react';

const useColorScheme = () => {
	const { colorScheme } = useContext(ColorSchemeContext);
	return colorScheme;
};

export default useColorScheme;
