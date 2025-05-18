import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useFonts } from 'expo-font';

const Recommendations = () => {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				scrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ flexDirection: 'row', paddingLeft: 8 }}
			>
				<View style={styles.boxContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.thirdGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.boxInnerContainer}></View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.boxContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.thirdGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.boxInnerContainer}></View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.boxContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.thirdGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.boxInnerContainer}></View>
					</TouchableNativeFeedback>
				</View>
			</ScrollView>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
				]}
				start={{ x: 0, y: 0 }} // left
				end={{ x: 1, y: 0 }} // right
				style={styles.fade}
			/>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			height: 164,
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
		},

		fade: {
			position: 'absolute',
			right: 0,
			width: 20,
			height: 164,
		},

		boxContainer: {
			width: 180,
			height: 124,
			backgroundColor: colorScheme === 'light' ? undefined : Colors.firstGray,
			borderRadius: 20,
			overflow: 'hidden',
			borderWidth: colorScheme === 'light' ? 1 : 0,
			borderColor: colorScheme === 'light' ? Colors.thirdGray : undefined,
			marginHorizontal: 8,
		},

		boxInnerContainer: {
			flex: 1,
		},
	});
}

export default Recommendations;
