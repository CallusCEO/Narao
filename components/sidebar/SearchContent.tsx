import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';

const SearchContent = () => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light' ? Colors.sixthGray : Colors.dark.primary,
				]}
				start={{ x: 0, y: 0 }} // left
				end={{ x: 0, y: 1 }} // right
				style={styles.fade}
			/>
			<View style={styles.innerContainer}>
				<View style={styles.searchContainer}>
					<TextInput>Hello</TextInput>
					<TouchableNativeFeedback>
						<View></View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			width: '100%',
			height: 164,
			marginTop: 'auto',
			position: 'relative',
		},

		innerContainer: {
			width: '100%',
			height: 164,
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.secondGray,
			marginTop: 'auto',
			paddingVertical: 16,
			paddingHorizontal: 12,
			borderTopColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderTopWidth: 1,
		},

		fade: {
			position: 'absolute',
			top: -50,
			width: '100%',
			height: 50,
		},

		searchContainer: {
			width: '100%',
			height: 48,
			borderRadius: 30,
			backgroundColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 8,
		},
	});
}

export default SearchContent;
