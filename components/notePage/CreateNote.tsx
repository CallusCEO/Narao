import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

const CreateNote = () => {
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

	// animation:
	// const translateX = useRef(new Animated.Value(0)).current;

	// useEffect(() => {
	// 	const animation = Animated.loop(
	// 		Animated.sequence([
	// 			Animated.timing(translateX, {
	// 				toValue: 1,
	// 				duration: 3000,
	// 				easing: Easing.inOut(Easing.ease),
	// 				useNativeDriver: true,
	// 			}),
	// 			Animated.timing(translateX, {
	// 				toValue: 0,
	// 				duration: 3000,
	// 				easing: Easing.inOut(Easing.ease),
	// 				useNativeDriver: true,
	// 			}),
	// 		])
	// 	);
	// 	animation.start();
	// }, []);

	// const translateInterpolation = translateX.interpolate({
	// 	inputRange: [0, 1],
	// 	outputRange: [-width, width], // wider travel range to cover the button
	// });

	return (
		<View style={styles.container}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					Colors.secondGray,
					false
				)}
			>
				<View style={styles.innerContainer}>
					<Animated.View
					// style={[
					// 	{
					// 		position: 'absolute',
					// 		width: width * 3, // double width to fully cover while animating
					// 		height: 48,
					// 		transform: [{ translateX: translateInterpolation }],
					// 	},
					// ]}
					>
						<LinearGradient
							colors={['#6666ff', '#66ff66', '#6666ff']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={StyleSheet.absoluteFill}
						/>
					</Animated.View>

					<Text style={styles.text}>New Note</Text>
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
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			marginHorizontal: 'auto',
			marginTop: 16,
			width: '80%',
			maxWidth: 324,
			height: 48,
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.primary
					: Colors.firstGray,
			borderRadius: 30,
			borderColor:
				colorScheme === 'light' ? Colors.secondGray : Colors.firstGray,
			borderWidth: 1,
			overflow: 'hidden',
		},

		innerContainer: {
			flex: 1,
			paddingHorizontal: 16,
			paddingVertical: 8,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},

		text: {
			fontFamily: 'SatoshiMedium',
			fontSize: 18,
			marginRight: 12,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},
	});
}
export default CreateNote;
