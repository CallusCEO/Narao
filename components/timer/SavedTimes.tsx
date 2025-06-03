import Colors from '@/constants/Colors';
import TimerPresets from '@/constants/TimerPresets';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import SavedTimesBox from './SavedTimeBox';

const SavedTimes = () => {
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
	const [selectedTitle, setSelectedTitle] = useState('');

	// function:
	const handleAddPress = () => {
		return;
	};

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				scrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					flexDirection: 'row',
					paddingHorizontal: width > 450 ? 24 : 12,
					gap: 16,
				}}
			>
				<View style={[styles.boxAddContainer]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
						onPress={() => handleAddPress()}
					>
						<View style={[styles.boxAddInnerContainer]}>
							<FontAwesome6
								name='add'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.fifthGray
										: Colors.thirdGray
								}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
				{TimerPresets.map((item) => (
					<TouchableWithoutFeedback
						onPress={() => setSelectedTitle(item.title)}
						key={item.title}
					>
						<SavedTimesBox
							title={item.title}
							time={item.time}
							mode={item.mode}
							pauseTime={item.pauseTime}
							numberPause={item.numberPause}
							isSelected={selectedTitle === item.title}
						/>
					</TouchableWithoutFeedback>
				))}
			</ScrollView>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light'
						? Colors.light.primary
						: Colors.dark.primary,
				]}
				start={{ x: 1, y: 0 }} // left
				end={{ x: 0, y: 0 }} // right
				style={styles.fadeLeft}
			/>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light'
						? Colors.light.primary
						: Colors.dark.primary,
				]}
				start={{ x: 0, y: 0 }} // left
				end={{ x: 1, y: 0 }} // right
				style={styles.fadeRight}
			/>
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
		container: {
			// backgroundColor: colorScheme === 'light' ? '#f0f0f0' : '#1c1c1e', // Example colors, adjust as needed
			paddingVertical: width > 450 ? 16 : 12,
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 'auto',
		},

		fadeRight: {
			position: 'absolute',
			right: 0,
			width: width > 450 ? 40 : 20,
			height: 80,
		},

		fadeLeft: {
			position: 'absolute',
			left: 0,
			width: width > 450 ? 20 : 10,
			height: 80,
		},

		boxAddContainer: {
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 20,
			overflow: 'hidden',
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			borderWidth: 1,
		},

		boxAddInnerContainer: {
			paddingVertical: width > 450 ? 12 : 8,
			paddingHorizontal: width > 450 ? 32 : 24,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
}

export default SavedTimes;
