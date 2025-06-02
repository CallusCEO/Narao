import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Line, Svg } from 'react-native-svg';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import formatTime from '@/utils/formatTime';

type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch' | 'current';

const ActionsBox = () => {
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
	} = useContext(TimerContext);
	const styles = createStyles(colorScheme, width, mode);

	// functions

	const [localTime, setLocalTime] = useState(time);

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

	useEffect(() => {
		displayTime = formatTime(time);
	}, [time]);

	// Internal time state for stopwatch if no time prop is passed

	return (
		<View style={styles.container}>
			<Feather
				style={{ marginRight: 8 }}
				name='clock'
				size={width > 450 ? 32 : 24}
				color={
					colorScheme === 'light'
						? Colors.light.secondary
						: Colors.dark.secondary
				}
			/>
			<Text style={styles.timerText}>{displayTime}</Text>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.7}
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
								size={width > 450 ? 32 : 24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							if (time !== 0 || mode === 'stopwatch') {
								setIsRunning(!isRunning);
							}
						}}
					>
						<View style={styles.button}>
							<Ionicons
								name={isRunning ? 'pause' : 'play'}
								size={width > 450 ? 32 : 24}
								color={
									colorScheme === 'light'
										? Colors.blueDistilled
										: Colors.blueDistilled
								}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<Svg style={styles.lineContainer} width='100%' height='2'>
				<Line
					x1={`${(time / initialTime) * 100}%`}
					y1='0'
					x2='0'
					y2='0'
					stroke={
						colorScheme === 'light'
							? Colors.light.secondary
							: Colors.dark.secondary
					}
					strokeWidth={3}
					strokeLinecap='round'
				/>
			</Svg>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(
	colorScheme: ColorScheme,
	width: number,
	mode: TimerMode
) {
	return StyleSheet.create({
		container: {
			marginTop: 'auto',
			height: width > 450 ? 80 : 56,
			width: '95%',
			display: 'flex',
			flexDirection: 'row',
			position: 'relative',
			marginHorizontal: 'auto',

			alignItems: 'center',
			paddingHorizontal: width > 450 ? 24 : 12,
			paddingLeft: width > 450 ? 32 : 20,
			paddingVertical: 4,
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 10,
			marginBottom: 12,
			elevation: 2,

			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			borderWidth: 1,
		},

		timerText: {
			fontFamily: 'SatoshiMedium',
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontSize: width > 450 ? 32 : 24,
		},

		buttonsContainer: {
			flexDirection: 'row',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: width > 450 ? 8 : 2,
			marginLeft: 'auto',
		},

		buttonContainer: {
			overflow: 'hidden',
			borderRadius: '50%',
		},

		button: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 8,
			paddingVertical: 10,
		},

		buttonText: {
			fontFamily: 'SatoshiMedium',
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			fontSize: width > 450 ? 24 : 18,
			marginTop: mode === 'pomodoro' ? -8 : 0,
		},

		lineContainer: {
			position: 'absolute',
			bottom: 0,
			marginLeft: width > 450 ? 28 : 16,
		},
	});
}

export default ActionsBox;
