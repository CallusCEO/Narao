import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { useFonts } from 'expo-font';
import React, { useContext, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import Rule from '../Rule';

type BottomSheetContentTimerProps = {
	bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
	openIntervals: boolean;
};

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

const BottomSheetContentTimer: React.FC<BottomSheetContentTimerProps> = ({
	bottomSheetRef,
	openIntervals,
}) => {
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	const [selectedHours, setSelectedHours] = useState(hours[0].value);
	const [selectedMinutes, setSelectedMinutes] = useState(minutes[0].value);
	const [selectedSeconds, setSelectedSeconds] = useState(seconds[0].value);

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
		setInitialTimePause,
		initialTimePause,
	} = useContext(TimerContext);

	return (
		<View>
			<Text style={styles.title}>
				{openIntervals ? 'Set pause time' : 'Set run time'}
			</Text>
			<Rule />
			<View style={styles.pickerContainer}>
				<View
					style={[
						styles.wheelPickerWrapper,
						{
							backgroundColor:
								colorScheme === 'light'
									? Colors.light.primary
									: Colors.firstGray,
						},
					]}
				>
					<WheelPicker
						value={selectedHours}
						onValueChanged={({ item }) =>
							setSelectedHours(item.value)
						}
						data={hours}
						itemHeight={48}
						renderItem={(props) => (
							<Text style={styles.wheelPickerText}>
								{props.index}
							</Text>
						)}
						overlayItemStyle={styles.overlayItem}
					/>
				</View>
				<View
					style={[
						styles.wheelPickerWrapper,
						{
							backgroundColor:
								colorScheme === 'light'
									? Colors.light.primary
									: Colors.firstGray,
						},
					]}
				>
					<WheelPicker
						value={selectedMinutes}
						onValueChanged={({ item }) =>
							setSelectedMinutes(item.value)
						}
						data={minutes}
						itemHeight={48}
						renderItem={(props) => (
							<Text style={styles.wheelPickerText}>
								{props.index}
							</Text>
						)}
						overlayItemStyle={styles.overlayItem}
					/>
				</View>
				<View style={[styles.wheelPickerWrapper]}>
					<WheelPicker
						value={selectedSeconds}
						onValueChanged={({ item }) =>
							setSelectedSeconds(item.value)
						}
						data={seconds}
						itemHeight={48}
						renderItem={(props) => (
							<Text style={styles.wheelPickerText}>
								{props.index}
							</Text>
						)}
						overlayItemStyle={styles.overlayItem}
					/>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light'
							? Colors.fifthGray
							: Colors.secondGray,
						false
					)}
					onPress={() => {
						if (!openIntervals) {
							setInitialTime(
								parseInt(selectedHours) * 3600 +
									parseInt(selectedMinutes) * 60 +
									parseInt(selectedSeconds)
							);
							setTime(initialTime);
							bottomSheetRef.current?.close();
						} else {
							setInitialTimePause(
								parseInt(selectedHours) * 3600 +
									parseInt(selectedMinutes) * 60 +
									parseInt(selectedSeconds)
							);
							setPauseTime(initialTimePause);
							bottomSheetRef.current?.close();
						}
					}}
				>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Validate</Text>
						<Ionicons
							name='checkmark-done'
							size={24}
							color={
								colorScheme === 'light'
									? Colors.light.secondary
									: Colors.dark.secondary
							}
						></Ionicons>
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		title: {
			fontSize: 22,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			textAlign: 'center',
			marginBottom: 12,
			fontFamily: 'SatoshiBold',
		},

		pickerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		},

		wheelPickerWrapper: {
			width: 112,
			height: 224,
			overflow: 'hidden',
		},

		buttonContainer: {
			marginHorizontal: 'auto',
			borderRadius: 30,
			overflow: 'hidden',
			borderColor:
				colorScheme === 'light'
					? Colors.blueDistilled
					: Colors.thirdGray,
			borderWidth: 1,
			marginTop: 32,
		},

		button: {
			display: 'flex',
			flexDirection: 'row',
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			paddingHorizontal: 64,
			paddingVertical: 8,
		},

		buttonText: {
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontFamily: 'SatoshiBold',
			fontSize: 18,
			marginRight: 8,
		},

		wheelPickerText: {
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontSize: width > 450 ? 20 : 18,
			marginHorizontal: 'auto',
			marginTop: width > 450 ? 10 : 12,
			fontFamily: 'SatoshiBold',
		},

		overlayItem: {
			backgroundColor:
				colorScheme === 'light' ? Colors.fourthGray : Colors.thirdGray,
		},
	});
}

export default BottomSheetContentTimer;
