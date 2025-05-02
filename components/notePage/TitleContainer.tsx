import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

interface Props {
	title: string;
	iconColor: string;
}

const TitleContainer = ({ title, iconColor }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);
	return (
		<View style={styles.topContainer}>
			<View style={styles.topInnerContainer}>
				<View style={styles.topLeftInnerContainer}>
					<MaterialIcons name='landscape' color={iconColor} size={32} />
					<Text style={[styles.textXL, styles.noteTitle, styles.Satoshi]}>{title}</Text>
				</View>
				<View style={styles.topRightInnerContainer}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(Colors.fourthGray, true)}
					>
						<View>
							<MaterialIcons
								name='more-vert'
								color={
									colorScheme === 'light'
										? Colors.light.secondary
										: Colors.dark.secondary
								}
								size={32}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		Satoshi: {
			fontFamily: 'Satoshi',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
		textXS: {
			fontSize: 14,
		},
		textS: {
			fontSize: 16,
		},
		textM: {
			fontSize: 18,
		},
		textXL: {
			fontSize: 20,
		},
		textXXL: {
			fontSize: 22,
		},
		textXXXL: {
			fontSize: 24,
		},
		textXXXXL: {
			fontSize: 26,
		},

		topContainer: {
			paddingHorizontal: 16,
			paddingVertical: 0,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			display: 'flex',
			flexDirection: 'column',
		},

		topInnerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative', // important for absolute positioning the icon
			marginBottom: 8,
			width: '100%',
		},

		topLeftInnerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginRight: 12,
		},

		topRightInnerContainer: {
			position: 'absolute',
			right: 8,
			borderRadius: 50,
			overflow: 'hidden',
		},

		noteTitle: {
			marginLeft: 8,
			fontWeight: 'bold',
		},
		rule: {
			width: '95%',
			height: 1,
			backgroundColor: Colors.fourthGray,
		},
	});
}

export default TitleContainer;
