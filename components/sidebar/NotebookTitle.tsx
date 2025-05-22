import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

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
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	return (
		<View style={styles.container}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					Colors.thirdGray,
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
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			height: 52,
			width: '100%',
			overflow: 'hidden',
			borderRadius: 10,
			marginBottom: 8,
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

		title: {
			fontSize: 22,
			marginLeft: 8,
			fontFamily: 'SatoshiBold',
			color:
				colorScheme === 'light'
					? Colors.dark.primary
					: Colors.light.primary,
		},

		dropdownIconContainer: {
			position: 'absolute',
			right: 16,
		},
	});
}
