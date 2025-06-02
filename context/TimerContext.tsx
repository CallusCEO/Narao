import React, { createContext, ReactNode, useState } from 'react';

// Define Timer Mode Type
type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch' | 'current';

// Define Context Type
interface TimerContextType {
	isRunning: boolean;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	pauseTime: number;
	setPauseTime: React.Dispatch<React.SetStateAction<number>>;
	pauseTimeNumber: number;
	setPauseTimeNumber: React.Dispatch<React.SetStateAction<number>>;
	mode: TimerMode;
	setMode: React.Dispatch<React.SetStateAction<TimerMode>>;
	setInitialTime: React.Dispatch<React.SetStateAction<number>>;
	initialTime: number;
	setInitialTimePause: React.Dispatch<React.SetStateAction<number>>;
	initialTimePause: number;
}

// Create context with default values (no-op functions)
export const TimerContext = createContext<TimerContextType>({
	isRunning: false,
	setIsRunning: () => {},
	time: 0,
	setTime: () => {},
	pauseTime: 0,
	setPauseTime: () => {},
	pauseTimeNumber: 0,
	setPauseTimeNumber: () => {},
	mode: 'countdown',
	setMode: () => {},
	initialTime: 0,
	setInitialTime: () => {},
	initialTimePause: 0,
	setInitialTimePause: () => {},
});

// Provider component
export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [isRunning, setIsRunning] = useState(false);
	const [time, setTime] = useState(60);
	const [pauseTime, setPauseTime] = useState(0);
	const [pauseTimeNumber, setPauseTimeNumber] = useState(0);
	const [mode, setMode] = useState<TimerMode>('countdown');
	const [initialTime, setInitialTime] = useState(0);
	const [initialTimePause, setInitialTimePause] = useState(300);

	return (
		<TimerContext.Provider
			value={{
				isRunning,
				setIsRunning,
				time,
				setTime,
				pauseTime,
				setPauseTime,
				pauseTimeNumber,
				setPauseTimeNumber,
				mode,
				setMode,
				initialTime,
				setInitialTime,
				initialTimePause,
				setInitialTimePause,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
