import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, {
	Dispatch,
	forwardRef,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	Animated,
	Dimensions,
	Easing,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Circle, Svg } from 'react-native-svg';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import formatTime from '@/utils/formatTime';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch' | 'current';

type Props = {
	setOpenIntervals: Dispatch<SetStateAction<boolean>>;
};

const Timer = forwardRef<BottomSheetMethods, Props>((props, ref) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);

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
		setInitialTimePause,
		initialTimePause,
	} = useContext(TimerContext);
	const [tick, setTick] = useState(0);
	const styles = createStyles(colorScheme, width, mode);
	const [isPause, setIsPause] = useState(false);

	// functions

	useEffect(() => {
		setTime(initialTime);
		setInitialTimePause(initialTimePause);
		setPauseTime(initialTimePause);
		setIsPause(false);
	}, [initialTime, initialTimePause]);

	const handleSetTimePress = () => {
		props.setOpenIntervals(false);
		setIsRunning(false);
		if (ref && typeof ref !== 'function') {
			width > 450
				? ref.current?.snapToIndex(0)
				: ref.current?.snapToIndex(1);
		}
	};

	const handleIntervalsPress = () => {
		props.setOpenIntervals(true);
		if (ref && typeof ref !== 'function') {
			width > 450
				? ref.current?.snapToIndex(0)
				: ref.current?.snapToIndex(1);
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
				if (!isPause) {
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
				} else {
					if (mode === 'stopwatch') {
						setPauseTime
							? setPauseTime((prev: number) => prev + 1)
							: setLocalTime((prev: number) => prev + 1);
					} else if (mode === 'pomodoro' && time > 0) {
						setPauseTime?.((prev) => {
							if (prev <= 1) {
								clearInterval(interval);
								setIsRunning?.(false);
								return 0;
							}
							return prev - 1;
						});
					}
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isRunning, mode]);

	// Format time to HH:MM:S

	let displayTime = '';

	if (isPause) {
		if (mode === 'current') {
			const now = new Date();
			displayTime = `${now.getHours().toString().padStart(2, '0')}:${now
				.getMinutes()
				.toString()
				.padStart(2, '0')}:${now
				.getSeconds()
				.toString()
				.padStart(2, '0')}`;
		} else if (mode === 'stopwatch') {
			displayTime = formatTime(
				pauseTime !== undefined ? pauseTime : localTime
			);
		} else {
			displayTime = formatTime(pauseTime);
		}
	} else {
		if (mode === 'current') {
			const now = new Date();
			displayTime = `${now.getHours().toString().padStart(2, '0')}:${now
				.getMinutes()
				.toString()
				.padStart(2, '0')}:${now
				.getSeconds()
				.toString()
				.padStart(2, '0')}`;
		} else if (mode === 'stopwatch') {
			displayTime = formatTime(time !== undefined ? time : localTime);
		} else {
			displayTime = formatTime(time);
		}
	}

	// animation
	const AnimatedCircle = Animated.createAnimatedComponent(Circle);
	const radius = width > 450 ? 180 : 124;
	const strokeWidth = 10;
	const circumference = 2 * Math.PI * radius;

	// Animated value for the stroke
	const progress = useRef(new Animated.Value(0)).current;

	// Interpolated strokeDashoffset
	const strokeDashoffset = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [circumference, 0],
	});

	useEffect(() => {
		if (mode === 'countdown' || mode === 'pomodoro') {
			// percentage left between 0 and 1
			const percent = isPause
				? pauseTime / initialTimePause
				: time / initialTime;

			Animated.timing(progress, {
				toValue: percent,
				duration: 500, // for smoothing; shorter than your tick
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}).start();
			console.log(`init: ${initialTimePause} --- time: ${pauseTime}`);
		}
	}, [time, isRunning, mode, pauseTime]);

	useEffect(() => {
		if (
			!isRunning &&
			time === 0 &&
			pauseTimeNumber > 0 &&
			mode === 'pomodoro'
		) {
			if (!isPause) {
				// Finished work session, start pause
				setTime(pauseTime);
				setInitialTimePause(initialTimePause);
				setIsRunning(true);
				setIsPause(true);
			} else {
				// Finished pause session, start work again
				setPauseTimeNumber((prev) => prev - 1);
				setTime(initialTime);
				setInitialTime(initialTime);
				setIsRunning(true);
				setIsPause(false);
			}
		} else if (!isRunning && time === 0 && pauseTimeNumber === 0) {
			setIsPause(false);
		}
	}, [isRunning, time]);

	return (
		<View style={styles.container}>
			<Svg
				width={radius * 2 + strokeWidth}
				height={radius * 2 + strokeWidth}
				style={[
					styles.timerClock,
					{
						display:
							mode === 'countdown' || mode === 'pomodoro'
								? undefined
								: 'none',
					},
				]}
			>
				<Circle
					stroke={
						colorScheme === 'light'
							? Colors.sixthGray
							: Colors.thirdGray
					} // track color
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius}
					strokeWidth={strokeWidth * 1}
					fill={
						colorScheme === 'light'
							? Colors.light.primary
							: Colors.dark.primary
					}
				/>
				<AnimatedCircle
					stroke={
						isPause
							? colorScheme === 'light'
								? Colors.blueDistilled
								: Colors.blueDistilled
							: colorScheme === 'light'
							? Colors.light.secondary
							: Colors.dark.secondary
					} // progress color
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={`${circumference}, ${circumference}`}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='butt'
					rotation='-90'
					origin={`${radius + strokeWidth / 2}, ${
						radius + strokeWidth / 2
					}`}
				/>
				<Circle
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius - strokeWidth / 2 + 6} // slightly smaller to fit inside
					fill={
						colorScheme === 'light'
							? Colors.light.primary
							: Colors.dark.primary
					}
				/>
			</Svg>

			<Text
				style={[
					styles.timerText,
					{
						fontSize:
							mode === 'current'
								? displayTime.length > 5
									? width > 450
										? 80
										: 64
									: width > 450
									? 80
									: 64
								: displayTime.length > 5
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

			{mode === 'pomodoro' && (
				<TouchableOpacity
					style={styles.intervalsContainer}
					activeOpacity={0.5}
					onPress={() => handleIntervalsPress()}
				>
					<Text style={styles.intervalsTextStart}>Intervals of </Text>
					<Text style={styles.intervalsTextMiddle}>
						{initialTimePause}
					</Text>
					<Text style={styles.intervalsTextEnd}> sec</Text>

					<Entypo
						name='cycle'
						size={24}
						color={
							colorScheme === 'light'
								? Colors.light.secondary
								: Colors.fourthGray
						}
					></Entypo>
				</TouchableOpacity>
			)}
			{mode !== 'stopwatch' && (
				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.textButtonContainer}
					onPress={() => handleSetTimePress()}
				>
					<Text style={styles.buttonText}>Set time</Text>
				</TouchableOpacity>
			)}
		</View>
	);
});

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(
	colorScheme: ColorScheme,
	width: number,
	mode: TimerMode
) {
	return StyleSheet.create({
		container: {
			marginTop: '35%',
			flex: 1,
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
			marginTop: mode === 'pomodoro' ? -8 : 0,
		},

		buttonText: {
			fontFamily: 'SatoshiMedium',
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			fontSize: width > 450 ? 24 : 18,
			marginTop: mode === 'pomodoro' ? -8 : 0,
		},

		timerClock: {
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: [{ translateX: '-50%' }, { translateY: '-30%' }],
		},

		textButtonContainer: {
			marginHorizontal: 'auto',
			height: 32,
			paddingHorizontal: 24,
		},

		intervalsContainer: {
			marginHorizontal: 'auto',
			paddingHorizontal: width > 450 ? 24 : 12,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 12,
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 10,
		},

		intervalsTextStart: {
			fontFamily: 'SatoshiBold',
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.fourthGray,
			fontSize: width > 450 ? 20 : 18,
			marginBottom: 4,
		},

		intervalsTextMiddle: {
			fontFamily: 'SatoshiBold',
			color:
				colorScheme === 'light'
					? Colors.blueDistilled
					: Colors.blueDistilled,
			fontSize: width > 450 ? 20 : 18,
			marginBottom: 4,
		},

		intervalsTextEnd: {
			fontFamily: 'SatoshiBold',
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.fourthGray,
			fontSize: width > 450 ? 20 : 18,
			marginRight: width > 450 ? 8 : 4,
			marginBottom: 4,
		},
	});
}

export default Timer;
