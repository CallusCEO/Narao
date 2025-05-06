import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useContext, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookType } from '@/types/ContentType';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import FolderListItem from './FolderListItem';

interface Props extends NotebookType {
	iconColor: string;
	iconName: string;
}

const NotebookListItem = ({
	iconName,
	iconColor,
	name,
	id,
	content,
}: Props) => {
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
		return name.trim().length < 17
			? name.trim()
			: name.slice(0, 17).trim() + '...';
	};

	return (
		<View style={styles.container}>
			<View style={styles.notebookContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						Colors.fourthGray,
						false
					)}
					onPress={() => setIsOpen(!isOpen)}
					// onLongPress={(e) => ref.current?.expand()}
				>
					<View style={styles.innerContainer}>
						<MaterialIcons
							/* @ts-ignore */
							name={iconName}
							size={28}
							color={iconColor}
						/>
						<Text style={[styles.textS, styles.title]}>
							{handleNameLength(name)}
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
			{isOpen && (
				<View style={styles.contentContainer}>
					{content?.map((folder) => (
						<TouchableWithoutFeedback
							// onLongPress={() => {
							// 	bottomSheetRef.current?.snapToIndex(0);
							// }}
							key={folder.folder?.id}
							style={{
								marginBottom: 12,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<FolderListItem
								id={folder.folder?.id || 0}
								name={folder.folder?.name || 'Error not found'}
								content={folder.folder?.content}
							/>
						</TouchableWithoutFeedback>
					))}
				</View>
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
			width: width > 450 ? '95%' : '100%',
			overflow: 'hidden',
		},

		notebookContainer: {
			width: '100%',
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.primary
					: Colors.firstGray,
			borderRadius: 10,
			borderColor:
				colorScheme === 'light' ? Colors.thirdGray : Colors.firstGray,
			borderWidth: 1,
			borderStyle: 'solid',
			overflow: 'hidden',
			elevation: colorScheme === 'light' ? 5 : 10,
			height: 48,
		},

		contentContainer: {
			marginLeft: 'auto',
			marginTop: 8,
			paddingTop: 8,
			paddingLeft: 16,
			width: '95%',
			borderLeftWidth: 1,
			borderLeftColor:
				colorScheme === 'light' ? Colors.thirdGray : Colors.secondGray,
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

export default NotebookListItem;
