import { Entypo, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	Easing,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
} from 'react-native';
import { Circle, Svg } from 'react-native-svg';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const Timer = forwardRef<BottomSheetMethods, {}>((props, ref) => {
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
		initialTime,
		setInitialTime,
	} = useContext(TimerContext);
	const [tick, setTick] = useState(0);

	// functions

	const handlePress = () => {
		if (ref && typeof ref !== 'function') {
			ref.current?.snapToIndex(0);
		}
		setIsRunning(false);
	};

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
				} else if ((mode === 'pomodoro' || mode === 'countdown') && time > 0) {
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

	// animation
	const AnimatedCircle = Animated.createAnimatedComponent(Circle);
	const radius = 124;
	const strokeWidth = 5;
	const circumference = 2 * Math.PI * radius;

	// Animated value for the stroke
	const progress = useRef(new Animated.Value(0)).current;

	// Interpolated strokeDashoffset
	const strokeDashoffset = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [circumference, 0],
	});

	useEffect(() => {
		if (mode === 'countdown' || (mode === 'pomodoro' && isRunning)) {
			// percentage left between 0 and 1
			const percent = time / initialTime;
			Animated.timing(progress, {
				toValue: percent,
				duration: 500, // for smoothing; shorter than your tick
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}).start();
		}
	}, [time, isRunning, mode]);

	return (
		<View style={styles.container}>
			<Svg
				width={radius * 2 + strokeWidth}
				height={radius * 2 + strokeWidth}
				style={[
					styles.timerClock,
					{ display: mode === 'countdown' || mode === 'pomodoro' ? undefined : 'none' },
				]}
			>
				<Circle
					stroke={Colors.secondGray} // track color
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius}
					strokeWidth={strokeWidth * 1}
					fill={colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary}
				/>
				<AnimatedCircle
					stroke={Colors.blueDistilled} // progress color
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={`${circumference}, ${circumference}`}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
					rotation='-90'
					origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}
				/>
				<Circle
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius - strokeWidth / 2} // slightly smaller to fit inside
					fill={colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary}
				/>
			</Svg>

			<Text
				style={[
					styles.timerText,
					{
						fontSize:
							displayTime.length > 5
								? width > 450
									? 64
									: 42
								: width > 450
								? 80
								: 64,
					},
				]}
			>
				{displayTime}
			</Text>

			<TouchableOpacity
				activeOpacity={0.5}
				style={styles.textButtonContainer}
				onPress={() => handlePress()}
			>
				<Text style={styles.buttonText}>Set time</Text>
			</TouchableOpacity>

			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							setIsRunning(false);
							if (mode === 'countdown' || mode === 'pomodoro') {
								setTime(initialTime);
							}
						}}
					>
						<View style={styles.button}>
							<Entypo
								name={'controller-stop'}
								size={32}
								color={
									colorScheme === 'light'
										? Colors.redDistilled
										: Colors.redDistilled
								}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							if (!isRunning && (mode === 'countdown' || mode === 'pomodoro')) {
								setTime(initialTime); // capture starting point when timer starts
							}
							setIsRunning(!isRunning);
						}}
					>
						<View style={styles.button}>
							<Ionicons
								name={isRunning ? 'pause' : 'play'}
								size={32}
								color={
									colorScheme === 'light'
										? Colors.blueDistilled
										: Colors.blueDistilled
								}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
});

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
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
			fontSize: width > 450 ? 80 : 64,
			marginHorizontal: 'auto',
		},

		buttonsContainer: {
			flexDirection: 'row',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 112,
			gap: 16,
		},

		buttonContainer: {
			overflow: 'hidden',
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.fourthGray : Colors.secondGray,
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
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
		},

		buttonText: {
			fontFamily: 'SatoshiMedium',
			color: colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			fontSize: width > 450 ? 24 : 18,
		},

		timerClock: {
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: [{ translateX: '-50%' }, { translateY: '-30%' }],
		},

		textButtonContainer: {
			marginHorizontal: 'auto',
			// backgroundColor: '#fff',
			height: 32,
			paddingHorizontal: 24,
		},
	});
}

export default Timer;
