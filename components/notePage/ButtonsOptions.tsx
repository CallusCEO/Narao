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
import {
	AntDesign,
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

// sample data import

const ButtonOptions: () => ReactNode = () => {
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

	// functions
	const calculateDarkLightText = (color: `#${string}`) => {
		const symbols = {
			'0': 0,
			'1': 1,
			'2': 2,
			'3': 3,
			'4': 4,
			'5': 5,
			'6': 6,
			'7': 7,
			'8': 8,
			'9': 9,
			a: 10,
			b: 11,
			c: 12,
			d: 13,
			e: 14,
			f: 15,
		};

		const rawColor = color.trim().slice(1, 6);
		const colorAsList = rawColor.split('');

		let score = 0;
		const colorCalculated = colorAsList.forEach((character: string) => {
			score += symbols[character as keyof typeof symbols];
		});

		// multiply score by 3 if there were only 3 characters :
		score = rawColor.length === 3 ? score * 2 : score;

		return score > 45 ? Colors.dark.primary : Colors.light.primary;
	};
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
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<AntDesign
								name='search1'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Search</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<MaterialCommunityIcons
								name='sort-alphabetical-ascending'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Auto-Sort</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<FontAwesome6
								name='images'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>View</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.secondGray,
							false
						)}
					>
						<View style={styles.button}>
							<MaterialIcons
								name='new-releases'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text style={styles.buttonText}>Surprise me!</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
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

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			marginTop: 16,
			height: 42,
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
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			marginLeft: 8,
		},

		buttonTextSpecial: {
			fontFamily: 'SatoshiMedium',
			fontSize: 16,
			color:
				colorScheme === 'light'
					? Colors.blueDistilled
					: Colors.blueDistilled,
			marginLeft: 8,
		},

		buttonContainerSpecial: {
			height: 36,
			borderRadius: 30,
			borderWidth: 1,
			borderColor:
				colorScheme === 'light'
					? Colors.blueDistilled
					: Colors.blueDistilled,
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			overflow: 'hidden',
		},

		buttonContainer: {
			height: 36,
			borderRadius: 30,
			borderWidth: 1,
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
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

export default ButtonOptions;
