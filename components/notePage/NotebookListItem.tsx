import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookType } from '@/types/ContentType';

interface Props extends NotebookType {
	iconColor: string;
	iconName: string;
}

const NotebookListItem = ({ iconColor, iconName, name, id, content }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	// functions :
	const handleNameLength = (name: string): string => {
		return name.trim().length < 17 ? name.trim() : name.slice(0, 17).trim() + '...';
	};

	return (
		<View style={styles.container}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(Colors.fourthGray, false)}
				// onLongPress={}
			>
				<View style={styles.innerContainer}>
					{/* @ts-ignore */}
					<MaterialIcons name={iconName} size={28} color={iconColor} />
					<Text style={[styles.textS, styles.title]}>{handleNameLength(name)}</Text>
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
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
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

		container: {
			width: '90%',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			borderRadius: 10,
			borderColor: Colors.thirdGray,
			borderWidth: 1,
			borderStyle: 'solid',
			overflow: 'hidden',
			elevation: 10,
		},

		innerContainer: {
			width: '100%',
			height: '100%',
			paddingVertical: 8,
			paddingHorizontal: 16,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
		},

		title: {
			fontSize: 16,
			marginLeft: 8,
			fontFamily: 'SatoshiMedium',
			color: colorScheme === 'light' ? Colors.dark.primary : Colors.light.primary,
		},

		dropdownIconContainer: {
			position: 'absolute',
			right: 16,
		},
	});
}

export default NotebookListItem;
