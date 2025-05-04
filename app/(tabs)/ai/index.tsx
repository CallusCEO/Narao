import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

export default function AiPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	return <GestureHandlerRootView style={styles.container}></GestureHandlerRootView>;
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		satoshi: {
			fontFamily: 'Satoshi',
			fontSize: 30,
			color: Colors.light.secondary,
		},
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
		},
	});
}
