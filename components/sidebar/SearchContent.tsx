import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { AntDesign, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

const SearchContent = () => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const width = Dimensions.get('window').width;
	const styles = createStyles(colorScheme, width);

	return (
		/* <LinearGradient
				colors={[
					'transparent',
					colorScheme === 'light'
						? Colors.sixthGray
						: Colors.secondGray,
				]}
				start={{ x: 0, y: 0 }} // left
				end={{ x: 0, y: 1 }} // right
				style={styles.fade}
			/> */
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.searchContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
					>
						<View style={styles.buttonSearch}>
							<AntDesign
								name='search1'
								size={32}
								color={
									colorScheme === 'light'
										? Colors.mainDistilled
										: Colors.mainDistilled
								}
							/>
							<Text style={styles.buttonText}>Search</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.noteContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
					>
						<View style={styles.buttonNote}>
							<FontAwesome5
								name='edit'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<View style={styles.swipeContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
					>
						<View style={styles.buttonNote}>
							<FontAwesome6
								name='images'
								size={24}
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
							/>
							<Text
								style={[
									styles.buttonText,
									{
										color:
											colorScheme === 'light'
												? Colors.light.secondary
												: Colors.dark.secondary,
									},
								]}
							>
								View
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.sortContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
							false
						)}
					>
						<View style={styles.buttonSearch}>
							<MaterialCommunityIcons
								name='sort-alphabetical-ascending'
								size={32}
								color={
									colorScheme === 'light'
										? Colors.mainDistilled
										: Colors.mainDistilled
								}
							/>
							<Text style={styles.buttonText}>Auto-Sort</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			width: '100%',
			height: width > 450 ? 212 : 188,
			marginTop: 'auto',
			paddingVertical: 16,
			paddingHorizontal: 12,
			borderTopColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderTopWidth: 1,
			display: 'flex',
			flexDirection: 'column',
			gap: 12,
		},

		// fade: {
		// 	position: 'absolute',
		// 	top: -20,
		// 	width: '100%',
		// 	height: 20,
		// },

		topContainer: {
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},

		bottomContainer: {
			width: '100%',
			height: '50%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},

		searchContainer: {
			height: 48,
			width: '65%',
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.mainDistilled : Colors.mainDistilled,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			overflow: 'hidden',
		},

		noteContainer: {
			height: 48,
			width: '30%',
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			overflow: 'hidden',
		},

		sortContainer: {
			height: 48,
			width: '55%',
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.mainDistilled : Colors.mainDistilled,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			overflow: 'hidden',
		},

		swipeContainer: {
			height: 48,
			width: '40%',
			borderRadius: 30,
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			overflow: 'hidden',
		},

		buttonSearch: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},

		buttonNote: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},

		buttonText: {
			fontFamily: 'SatoshiBold',
			fontSize: 16,
			color: colorScheme === 'light' ? Colors.mainDistilled : Colors.mainDistilled,
			marginLeft: 8,
		},
	});
}

export default SearchContent;
