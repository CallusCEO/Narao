'use client';

import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode, useContext } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// sample data import

const ModeOptions: () => ReactNode = () => {
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
		setInitialTime,
	} = useContext(TimerContext);

	if (!fontsLoaded) return null;

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				scrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					flexDirection: 'row',
					paddingHorizontal: '5%',
					gap: 8,
				}}
			>
				<View style={[styles.buttonContainer, mode === 'countdown' && styles.buttonActive]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							setMode('countdown');
							setInitialTime(60);
							setTime(60);
							setIsRunning(false);
						}}
					>
						<View style={[styles.button]}>
							<MaterialIcons
								name='timer'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Countdown</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.buttonContainer, mode === 'pomodoro' && styles.buttonActive]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							setMode('pomodoro');
							setInitialTime(60 * 30);
							setTime(60 * 30);
							setIsRunning(false);
							setPauseTime(300);
							setPauseTimeNumber(3);
						}}
					>
						<View style={styles.button}>
							<MaterialCommunityIcons
								name='timer-sand'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Pomodoro</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.buttonContainer, mode === 'stopwatch' && styles.buttonActive]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							setMode('stopwatch');
							setInitialTime(0);
							setTime(0);
							setIsRunning(false);
						}}
					>
						<View style={styles.button}>
							<Entypo
								name='stopwatch'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Stopwatch</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.buttonContainer, mode === 'current' && styles.buttonActive]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
						onPress={() => {
							setMode('current');
							setIsRunning(false);
						}}
					>
						<View style={styles.button}>
							<Feather
								name='clock'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Current time</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</ScrollView>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
				]}
				start={{ x: 1, y: 0 }} // left
				end={{ x: 0, y: 0 }} // right
				style={styles.fadeLeft}
			/>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
				]}
				start={{ x: 0, y: 0 }} // left
				end={{ x: 1, y: 0 }} // right
				style={styles.fadeRight}
			/>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			marginTop: 16,
			height: 36,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
		},

		fadeRight: {
			position: 'absolute',
			right: 0,
			width: 20,
			height: 42,
		},

		fadeLeft: {
			position: 'absolute',
			left: 0,
			width: 20,
			height: 42,
		},

		buttonText: {
			fontFamily: 'SatoshiMedium',
			fontSize: 16,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
			marginLeft: 8,
		},

		buttonTextSpecial: {
			fontFamily: 'SatoshiMedium',
			fontSize: 16,
			color: colorScheme === 'light' ? Colors.blueDistilled : Colors.blueDistilled,
			marginLeft: 8,
		},

		buttonContainerSpecial: {
			height: 36,
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.blueDistilled : Colors.blueDistilled,
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			overflow: 'hidden',
		},

		buttonActive: {
			backgroundColor: colorScheme === 'light' ? Colors.blueDistilled : Colors.firstGray,
			borderColor: colorScheme === 'light' ? Colors.thirdGray : Colors.blueDistilled,
			borderWidth: 1,
		},

		buttonContainer: {
			height: 36,
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			overflow: 'hidden',
		},

		button: {
			flex: 1,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 16,
		},
	});
}

export default ModeOptions;
