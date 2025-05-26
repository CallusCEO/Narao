import {
	Feather,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { data } from '@/constants/sampleNoteData';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import handleTextLength from '@/utils/handleTextLength';

interface Props {
	id: number;
}

export default function NotebookTitle({ id }: Props) {
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
		<View style={styles.container}>
			<View style={styles.notebookContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light'
							? Colors.fifthGray
							: Colors.secondGray,
						false
					)}
				>
					<View style={styles.innerContainer}>
						<MaterialCommunityIcons
							/*@ts-ignore */
							name={data[id].iconName}
							size={36}
							color={data[id].iconColor}
						/>
						<Text style={styles.title}>
							{handleTextLength(data[id].name, 17)}
						</Text>
						<View style={styles.dropdownIconContainer}>
							<MaterialIcons
								name='keyboard-arrow-down'
								size={28}
								color={Colors.thirdGray}
							/>
						</View>
					</View>
				</TouchableNativeFeedback>
			</View>
			<View style={styles.settingsContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light'
							? Colors.fifthGray
							: Colors.secondGray,
						false
					)}
				>
					<View style={styles.settingsInnerContainer}>
						<Feather
							name='settings'
							size={24}
							color={Colors.thirdGray}
						/>
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			height: 52,
			width: '100%',
			overflow: 'hidden',
			marginBottom: 8,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 8,
		},

		innerContainer: {
			height: '100%',
			width: '100%',
			paddingVertical: 8,
			paddingHorizontal: 12,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
		},

		settingsInnerContainer: {
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},

		notebookContainer: {
			height: '100%',
			width: '82%',
			overflow: 'hidden',
			borderBottomLeftRadius: 20,
			borderBottomRightRadius: 5,
			borderTopLeftRadius: 20,
			borderTopRightRadius: 5,
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderWidth: 1,
		},

		settingsContainer: {
			height: '100%',
			width: '15%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 20,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 20,
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderWidth: 1,
		},

		title: {
			fontSize: 20,
			marginLeft: 8,
			fontFamily: 'SatoshiBold',
			color:
				colorScheme === 'light'
					? Colors.dark.primary
					: Colors.light.primary,
		},

		dropdownIconContainer: {
			position: 'absolute',
			right: width > 450 ? 16 : 8,
		},
	});
}
