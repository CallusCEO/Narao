import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React, { ReactNode, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { FolderType } from '@/types/ContentType';

interface Props extends FolderType {
	children?: ReactNode | undefined;
	maxTextLength: number;
}

const FolderListItem = ({ name, id, children, maxTextLength }: Props) => {
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

	// states :
	const [isOpen, setIsOpen] = useState(false);

	// functions :
	const handleNameLength = (name: string): string => {
		return name.trim().length < maxTextLength
			? name.trim()
			: name.slice(0, maxTextLength).trim() + '...';
	};

	const handleChildrenVoidTitle = () => {
		const childrenCount = React.Children.count(children);
		return childrenCount === 0 ? 'folder-hidden' : isOpen ? 'folder-open' : 'folder';
	};

	return (
		<View style={styles.container}>
			<View style={styles.folderContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(Colors.secondGray, false)}
					onPress={() =>
						React.Children.count(children) === 0 ? null : setIsOpen(!isOpen)
					}
				>
					<View style={styles.innerContainer}>
						<MaterialCommunityIcons
							name={handleChildrenVoidTitle()}
							size={28}
							color={
								colorScheme === 'light'
									? Colors.light.secondary
									: Colors.dark.secondary
							}
						/>
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
			{isOpen && children !== undefined && (
				<View style={styles.contentContainer}>{children}</View>
			)}
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
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
			width: '100%',
			overflow: 'hidden',
		},

		folderContainer: {
			width: '100%',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : undefined,
			borderRadius: 20,
			borderColor: colorScheme === 'light' ? Colors.thirdGray : Colors.firstGray,
			borderWidth: 1,
			borderStyle: 'solid',
			overflow: 'hidden',
			height: 42,
			display: 'flex',
			flexDirection: 'row',
			alignContent: 'center',
		},

		contentContainer: {
			marginLeft: 'auto',
			marginTop: 8,
			paddingTop: 8,
			paddingLeft: 16,
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
			fontSize: 16,
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

export default FolderListItem;
