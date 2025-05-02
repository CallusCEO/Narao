import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';

export default function AiPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});

	const styles = createStyles();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.primary }}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={styles.satoshi}>Here is the ai screen</Text>
			</View>
		</SafeAreaView>
	);
}

function createStyles() {
	return StyleSheet.create({
		satoshi: {
			fontFamily: 'Satoshi',
			fontSize: 30,
			color: Colors.light.secondary,
		},
		container: {
			backgroundColor: Colors.light.primary,
		},
	});
}
