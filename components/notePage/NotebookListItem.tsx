import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { ReactNode, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { data } from '@/constants/sampleNoteData';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookType } from '@/types/ContentType';
import handleTextLength from '@/utils/handleTextLength';

interface Props extends NotebookType {
	iconColor: string;
	iconName: string;
	children?: ReactNode;
}

const NotebookListItem = ({ iconName, iconColor, name, id, content, children }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width, id);

	// states :
	const [isOpen, setIsOpen] = useState(false);

	// functions :
	const handleChildrenVoidTitle = () => {
		return children === undefined ? '(Empty)' : null;
	};

	return (
		<View style={styles.container}>
			<View style={styles.notebookContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(Colors.fourthGray, false)}
					onPress={() => setIsOpen(!isOpen)}
					// onLongPress={(e) => ref.current?.expand()}
				>
					<View style={styles.innerContainer}>
						<MaterialCommunityIcons
							/* @ts-ignore */
							name={iconName}
							size={28}
							color={iconColor}
						/>
						<Text style={[styles.textS, styles.title]}>
							{handleTextLength(name, 17)}
						</Text>
						<Text style={[styles.textXS, styles.voidNotebookTitle]}>
							{handleChildrenVoidTitle()}
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
			{isOpen && children !== undefined && (
				<View style={styles.contentContainer}>{children}</View>
			)}
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number, id: number) {
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

		container: {
			width: width > 450 ? '95%' : '100%',
			overflow: 'hidden',
		},

		notebookContainer: {
			width: '100%',
			borderBottomColor:
				data[data.length - 1].id !== id && colorScheme === 'light'
					? Colors.thirdGray
					: Colors.firstGray,
			borderBottomWidth: data[data.length - 1].id !== id ? 1 : undefined,
			borderStyle: data[data.length - 1].id !== id ? 'solid' : undefined,
			overflow: 'hidden',
			height: 54,
		},

		contentContainer: {
			marginLeft: 'auto',
			marginTop: 8,
			paddingTop: 8,
			paddingLeft: 16,
			paddingRight: 4,
			width: '95%',
			borderLeftWidth: 1,
			borderLeftColor: colorScheme === 'light' ? Colors.thirdGray : Colors.secondGray,
		},

		innerContainer: {
			width: '100%',
			height: '100%',
			paddingHorizontal: 16,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
		},

		title: {
			marginLeft: 8,
			fontFamily: 'SatoshiMedium',
			color: colorScheme === 'light' ? Colors.dark.primary : Colors.light.primary,
		},

		voidNotebookTitle: {
			marginLeft: 12,
			fontFamily: 'SatoshiMedium',
			color: colorScheme === 'light' ? Colors.firstGray : Colors.thirdGray,
			fontStyle: 'italic',
		},

		dropdownIconContainer: {
			position: 'absolute',
			right: 16,
		},
	});
}

export default NotebookListItem;
