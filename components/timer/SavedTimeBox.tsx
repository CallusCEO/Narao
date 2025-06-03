import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { formatTime } from '@/utils/formatTime';
import handleTextLength from '@/utils/handleTextLength';
import {
	Entypo,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

interface Props {
	title: string;
	time: number;
	pauseTime?: number;
	numberPause?: number;
	mode: 'pomodoro' | 'countdown' | 'stopwatch';
	isSelected: boolean;
}

const SavedTimesBox = ({
	title,
	time,
	mode,
	pauseTime,
	numberPause,
	isSelected,
}: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const {
		isRunning,
		setIsRunning,
		setTime,
		setPauseTime,
		pauseTimeNumber,
		setPauseTimeNumber,
		setMode,
		initialTime,
		setInitialTime,
		setInitialTimePause,
		initialPauseTimeNumber,
		setInitialPauseTimeNumber,
	} = useContext(TimerContext);

	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width, mode);

	// function to handle press
	const handlePress = () => {
		setIsRunning(false);
		setTime(time);
		setInitialTime(time);
		setPauseTime(pauseTime || 0);
		setInitialTimePause(pauseTime || 0);
		setPauseTimeNumber(numberPause || 0);
		setMode(mode);
		setInitialPauseTimeNumber(numberPause || 0);
		setIsRunning(false);
	};

	return (
		<View
			style={[
				styles.boxContainer,
				{
					borderColor:
						colorScheme === 'light'
							? isSelected
								? Colors.blue
								: Colors.fifthGray
							: isSelected
							? Colors.blueDistilled
							: Colors.thirdGray,
				},
			]}
		>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					colorScheme === 'light'
						? Colors.fifthGray
						: Colors.secondGray,
					false
				)}
				onPress={() => handlePress()}
			>
				<View style={styles.boxInnerContainer}>
					<Text style={styles.titleBox}>
						{handleTextLength(title, 20)}
					</Text>

					<View style={styles.rule}></View>

					<Text style={styles.timeTextBox}>{formatTime(time)}</Text>

					{/* {pauseTime && (
						<>
							<View style={styles.rule}></View>

							<Text style={styles.timeTextBox}>
								{`${formatTime(pauseTime)}`}
							</Text>
						</>
					)}

					{numberPause && (
						<>
							<View style={styles.rule}></View>

							<Text style={styles.timeTextBox}>
								{`${numberPause} ${
									numberPause === 1 ? 'Pause' : 'Pauses'
								}`}
							</Text>
						</>
					)} */}

					<View style={styles.icon}>
						{mode === 'pomodoro' && (
							<MaterialCommunityIcons
								name='timer-sand'
								size={64}
								color={
									colorScheme === 'light'
										? Colors.fifthGray
										: Colors.secondGray
								}
							/>
						)}
						{mode === 'countdown' && (
							<MaterialIcons
								name='timer'
								size={64}
								color={
									colorScheme === 'light'
										? Colors.fifthGray
										: Colors.secondGray
								}
							/>
						)}
						{mode === 'stopwatch' && (
							<Entypo
								name='stopwatch'
								size={64}
								color={
									colorScheme === 'light'
										? Colors.fifthGray
										: Colors.secondGray
								}
							/>
						)}
					</View>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch' | 'current';
type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(
	colorScheme: ColorScheme,
	width: number,
	mode: TimerMode
) {
	return StyleSheet.create({
		boxContainer: {
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 20,
			overflow: 'hidden',
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			borderWidth: 1,
			position: 'relative',
		},

		boxInnerContainer: {
			paddingHorizontal: 32,
			paddingVertical: width > 450 ? 12 : 8,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
		},

		titleBox: {
			fontFamily: 'SatoshiBold',
			fontSize: 18,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			zIndex: 999,
		},

		timeTextBox: {
			fontFamily: 'SatoshiBold',
			fontSize: 16,
			color:
				colorScheme === 'light' ? Colors.fourthGray : Colors.fourthGray,
			zIndex: 999,
		},

		icon: {
			position: 'absolute',
			right: -10,
			bottom: -20,
			transform: [{ rotate: '-30deg' }],
			opacity: colorScheme === 'light' ? 0.6 : 0.8,
		},

		rule: {
			marginHorizontal: 16,
			width: 2,
			height: '100%',
			backgroundColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
		},
	});
}

export default SavedTimesBox;
