import { useContext } from 'react';
import { CurrentModelContext } from '../context/currentModelProvider';

const useAIModel = () => {
	const { model, setModel } = useContext(CurrentModelContext);
	return { model, setModel };
};

export default useAIModel;
