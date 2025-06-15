import { useFonts } from 'expo-font';
import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';

type TimerMode = 'pomodoro' | 'countdown' | 'stopwatch' | 'current';

const RepetitionBox = () => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const { pauseTimeNumber, mode, setPauseTimeNumber, initialPauseTimeNumber, setIsPaused } =
		useContext(TimerContext);
	const styles = createStyles(colorScheme, width, mode);

	useEffect(() => {
		setPauseTimeNumber(initialPauseTimeNumber);
		setIsPaused(false);
	}, [initialPauseTimeNumber]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{`${pauseTimeNumber}`}</Text>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number, mode: TimerMode) {
	return StyleSheet.create({
		container: {
			backgroundColor: colorScheme === 'light' ? Colors.red : Colors.red,
			display: mode === 'pomodoro' ? 'flex' : undefined,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: 32,
			borderRadius: 20,
			paddingVertical: 4,

			opacity: mode === 'pomodoro' ? 1 : 0,
		},

		text: {
			fontFamily: 'SatoshiBold',
			fontSize: 18,
		},
	});
}

export default RepetitionBox;
