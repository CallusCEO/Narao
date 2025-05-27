import { useFonts } from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { Ionicons } from '@expo/vector-icons';

const Timer = () => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);
	const {
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
	} = useContext(TimerContext);
	const [tick, setTick] = useState(0);

	// Internal time state for stopwatch if no time prop is passed
	const [localTime, setLocalTime] = useState(time);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;

		if (mode === 'current') {
			interval = setInterval(() => {
				setTick((prev) => prev + 1); // Just to trigger re-render
			}, 1000);
		} else if (isRunning) {
			interval = setInterval(() => {
				if (mode === 'stopwatch') {
					setTime
						? setTime((prev: number) => prev + 1)
						: setLocalTime((prev: number) => prev + 1);
				} else if (
					(mode === 'pomodoro' || mode === 'countdown') &&
					time > 0
				) {
					setTime?.((prev) => {
						if (prev <= 1) {
							clearInterval(interval);
							setIsRunning?.(false);
							return 0;
						}
						return prev - 1;
					});
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, mode]);

	// Format time to HH:MM:SS
	const formatTime = (t: number) => {
		if (t >= 3600) {
			const hours = Math.floor(t / 3600)
				.toString()
				.padStart(2, '0');
			const minutes = Math.floor((t % 3600) / 60)
				.toString()
				.padStart(2, '0');
			const seconds = (t % 60).toString().padStart(2, '0');
			return `${hours}:${minutes}:${seconds}`;
		} else {
			const minutes = Math.floor(t / 60)
				.toString()
				.padStart(2, '0');
			const seconds = (t % 60).toString().padStart(2, '0');
			return `${minutes}:${seconds}`;
		}
	};

	let displayTime = '';

	if (mode === 'current') {
		const now = new Date();
		displayTime = `${now.getHours().toString().padStart(2, '0')}:${now
			.getMinutes()
			.toString()
			.padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
	} else if (mode === 'stopwatch') {
		displayTime = formatTime(time !== undefined ? time : localTime);
	} else {
		displayTime = formatTime(time);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.timerText}>{displayTime}</Text>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<Ionicons
								name='play'
								size={32}
								color={
									colorScheme === 'light'
										? Colors.blueDistilled
										: Colors.blueDistilled
								}
							/>
							{/* <Text style={styles.buttonText}>Start</Text> */}
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<Ionicons
								name='pause'
								size={32}
								color={
									colorScheme === 'light'
										? Colors.blueDistilled
										: Colors.blueDistilled
								}
							/>
							{/* <Text style={styles.buttonText}>Start</Text> */}
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			marginTop: '35%',
			height: 200,
			width: '90%',
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			marginHorizontal: 'auto',
		},

		timerText: {
			fontFamily: 'SatoshiBlack',
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontSize: width > 450 ? 80 : 64,
			marginHorizontal: 'auto',
		},

		buttonsContainer: {
			flexDirection: 'row',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 32,
			gap: 16,
		},

		buttonContainer: {
			overflow: 'hidden',
			borderWidth: 1,
			borderColor:
				colorScheme === 'light' ? Colors.fourthGray : Colors.secondGray,
			borderRadius: 30,
		},

		button: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: width > 450 ? 52 : 32,
			paddingVertical: 8,
			borderRadius: 30,
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.firstGray,
		},

		buttonText: {
			fontFamily: 'SatoshiMedium',
			color:
				colorScheme === 'light'
					? Colors.blueDistilled
					: Colors.blueDistilled,
			fontSize: width > 450 ? 24 : 18,
			marginLeft: 8,
		},
	});
}

export default Timer;
