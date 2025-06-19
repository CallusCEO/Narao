import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';

// custom imports
import PageHeader from '@/components/general/PageHeader';
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AiPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	return (
		<GestureHandlerRootView style={styles.container}>
			<PageHeader title='Llucas' />
		</GestureHandlerRootView>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			paddingTop: 40,
			flex: 1,
			paddingBottom: 88,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
		},
	});
}
