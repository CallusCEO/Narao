import { useContext } from 'react';
import { ScreenModeContext } from '../context/screenModeContext';

const useMode = () => {
	const { mode, setMode } = useContext(ScreenModeContext);
	return { mode, setMode };
};

export default useMode;
