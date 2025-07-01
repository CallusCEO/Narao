import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import useColorScheme from '@/hooks/useColorScheme';
import useMode from '@/hooks/useMode';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
	const { mode } = useMode();
	const [fontsLoaded] = useFonts({
		Montserrat: require('@/assets/fonts/Montserrat-VariableFont_wght.ttf'),
		Atkinson: require('@/assets/fonts/AtkinsonHyperlegibleMono-VariableFont_wght.ttf'),
	});

	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={[styles.container]}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						fontFamily: FONTS.Montserrat,
						fontSize: 24,
						color:
							colorScheme === 'light'
								? COLORS.light.secondary
								: COLORS.dark.secondary,
					}}
				>
					{mode === 'ai' ? 'AI' : 'Notes'}
				</Text>
			</View>
		</View>
	);
}

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
		},
	});
}
