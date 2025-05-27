import { useFonts } from 'expo-font';
import { useContext } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// custom imports
import PageHeader from '@/components/general/PageHeader';
import ModeOptions from '@/components/timer/ModeOptions';
import Timer from '@/components/timer/Timer';
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { TimerContext } from '@/context/TimerContext';

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

	return (
		<GestureHandlerRootView style={styles.container}>
			<PageHeader title='Timer' />
			<ModeOptions />
			<Timer />
		</GestureHandlerRootView>
	);
}
type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.primary
					: Colors.dark.primary,
			paddingTop: 40,
		},
	});
}
