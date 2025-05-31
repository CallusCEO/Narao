import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { useFonts } from 'expo-font';
import React, { forwardRef, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import WheelPicker from 'react-native-wheel-picker-expo';

// Map the arrays to the expected [{ label: string, value: string }] format
const hours = Array.from({ length: 100 }, (_, i) => {
	const value = i.toString().padStart(2, '0');
	return { label: value, value: value };
});
const minutes = Array.from({ length: 60 }, (_, i) => {
	const value = i.toString().padStart(2, '0');
	return { label: value, value: value };
});
const seconds = Array.from({ length: 60 }, (_, i) => {
	const value = i.toString().padStart(2, '0');
	return { label: value, value: value };
});

const BottomSheetContentTimer = forwardRef((props, ref) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const [selectedHours, setSelectedHours] = useState(0);
	const [selectedMinutes, setSelectedMinutes] = useState(0);
	const [selectedSeconds, setSelectedSeconds] = useState(0);

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

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>Set time</Text> */}
			<View style={styles.pickerContainer}>
				<WheelPicker
					initialSelectedIndex={selectedHours}
					items={hours}
					onChange={({ index, item }) => setSelectedHours(index)}
					height={175}
					width={100}
					backgroundColor={
						colorScheme === 'light' ? Colors.light.primary : Colors.firstGray
					}
				/>
				<WheelPicker
					initialSelectedIndex={selectedMinutes}
					items={minutes}
					onChange={({ index, item }) => setSelectedMinutes(index)}
					height={175}
					width={100}
					backgroundColor={
						colorScheme === 'light' ? Colors.light.primary : Colors.firstGray
					}
				/>
				<WheelPicker
					initialSelectedIndex={selectedSeconds}
					items={seconds}
					onChange={({ index, item }) => setSelectedSeconds(index)}
					height={175}
					width={100}
					backgroundColor={
						colorScheme === 'light' ? Colors.light.primary : Colors.firstGray
					}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
						false
					)}
					onPress={() =>
						setTime(selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds)
					}
				>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Validate</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
});

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {},
		title: {
			fontSize: 20,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
			textAlign: 'center',
			marginBottom: 8,
		},

		pickerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		},

		buttonContainer: {
			marginHorizontal: 'auto',
			borderRadius: 30,
			overflow: 'hidden',
			borderColor: colorScheme === 'light' ? Colors.blueDistilled : Colors.blueDistilled,
			borderWidth: 1,
			marginTop: 32,
		},

		button: {
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.dark.primary,
			paddingHorizontal: 64,
			paddingVertical: 8,
		},

		buttonText: {
			color: colorScheme === 'light' ? Colors.light.primary : Colors.dark.secondary,
			fontFamily: 'SatoshiBold',
			fontSize: 18,
		},
	});
}

export default BottomSheetContentTimer;
