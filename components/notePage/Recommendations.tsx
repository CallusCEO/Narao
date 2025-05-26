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
import { useFonts } from 'expo-font';

// sample data import
import { dataHistory } from '@/constants/History';
import handleTextLength from '@/utils/handleTextLength';

const Recommendations: () => ReactNode = () => {
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
			<Text style={styles.title}>Jump back in</Text>
			<ScrollView
				horizontal
				scrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					flexDirection: 'row',
					paddingHorizontal: '4%',
				}}
			>
				{dataHistory.map((note) => (
					<View style={styles.boxContainer} key={note.id}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								colorScheme === 'light'
									? Colors.fifthGray
									: Colors.thirdGray,
								false
							)}
						>
							<View style={styles.boxInnerContainer}>
								<View style={styles.detailsContainer}>
									<Text
										style={styles.words}
									>{`${note.words} words`}</Text>
									<Text style={styles.lastEdited}>
										{note.lastEdited}
									</Text>
								</View>
								<Text
									style={[
										styles.name,
										{
											color: calculateDarkLightText(
												typeof note.tags?.[0]?.color ===
													'string' &&
													note.tags[0]?.color.startsWith(
														'#'
													)
													? (note.tags[0]
															.color as `#${string}`)
													: (Colors.fifthGray as `#${string}`)
											),
										},
									]}
								>
									{handleTextLength(note.name, 17)}
								</Text>
								<Text
									style={[
										styles.notebookParent,
										{
											color: calculateDarkLightText(
												typeof note.tags?.[0]?.color ===
													'string' &&
													note.tags[0]?.color.startsWith(
														'#'
													)
													? (note.tags[0]
															.color as `#${string}`)
													: (Colors.fifthGray as `#${string}`)
											),
										},
									]}
								>
									{note.notebookParent}
								</Text>
								<View
									style={[
										styles.banner,
										{
											backgroundColor:
												note.tags &&
												typeof note.tags[0]?.color
													? note.tags[0]?.color
													: Colors.fifthGray,
										},
									]}
								></View>
							</View>
						</TouchableNativeFeedback>
					</View>
				))}
			</ScrollView>
			<LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light'
						? Colors.light.primary
						: Colors.dark.primary,
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
			height: 188,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
		},

		title: {
			color:
				colorScheme === 'light' ? Colors.fourthGray : Colors.thirdGray,
			fontSize: 16,
			marginVertical: 16,
			marginLeft: '5%',
			fontFamily: 'SatoshiMedium',
		},

		fade: {
			position: 'absolute',
			right: 0,
			width: 20,
			height: 188,
		},

		boxContainer: {
			width: 180,
			height: 124,
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 20,
			overflow: 'hidden',
			borderWidth: colorScheme === 'light' ? 1 : 0,
			borderColor: colorScheme === 'light' ? Colors.thirdGray : undefined,
			marginHorizontal: 8,
		},

		boxInnerContainer: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},

		banner: {
			width: '100%',
			height: 64,
			position: 'absolute',
			bottom: 0,
			left: 0,
		},

		name: {
			fontSize: 18,
			zIndex: 999,
			marginHorizontal: 8,
			marginTop: 64,
			fontFamily: 'SatoshiMedium',
		},

		detailsContainer: {
			width: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'row',
			paddingHorizontal: 12,
			paddingTop: 8,
		},

		words: {
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.fourthGray,
			fontFamily: 'SatoshiRegular',
		},

		notebookParent: {
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.fourthGray,
			fontSize: 14,
			zIndex: 999,
			marginHorizontal: 8,
			opacity: 0.7,
			fontFamily: 'SatoshiRegular',
		},

		lastEdited: {
			color:
				colorScheme === 'light' ? Colors.fifthGray : Colors.fourthGray,
			marginLeft: 'auto',
			fontFamily: 'SatoshiRegular',
		},
	});
}

export default Recommendations;
