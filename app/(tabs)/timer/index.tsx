import { useFonts } from 'expo-font';
import { useContext, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// custom imports
import BottomSheetComponent from '@/components/general/bottomPage/BottomSheetComponent';
import BottomSheetContentTimer from '@/components/general/bottomPage/BottomSheetContentTimer';
import PageHeader from '@/components/general/PageHeader';
import ActionsBox from '@/components/timer/ActionsBox';
import ModeOptions from '@/components/timer/ModeOptions';
import SavedTimes from '@/components/timer/SavedTimes';
import Timer from '@/components/timer/Timer';
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';
import BottomSheet from '@gorhom/bottom-sheet';

export default function TimerPage() {
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
	const bottomSheetRef = useRef<BottomSheet | null>(null);

	// states
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

	const [openIntervals, setOpenIntervals] = useState(false);
	const [openPauseNumber, setOpenPauseNumber] = useState(false);

	return (
		<GestureHandlerRootView style={styles.container}>
			<PageHeader title='Timer' />
			<ModeOptions />
			<Timer
				ref={bottomSheetRef}
				setOpenIntervals={setOpenIntervals}
				setOpenPauseNumber={setOpenPauseNumber}
			/>
			{mode !== 'current' && <ActionsBox />}
			<SavedTimes />
			<BottomSheetComponent ref={bottomSheetRef} contentPanningGestureOn={false}>
				<BottomSheetContentTimer
					bottomSheetRef={bottomSheetRef}
					openIntervals={openIntervals}
					openPauseNumber={openPauseNumber}
				/>
			</BottomSheetComponent>
		</GestureHandlerRootView>
	);
}
type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			paddingTop: 40,
			paddingBottom: 118,
		},
	});
}
