import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { NoteType } from '@/types/ContentType';
import handleTextLength from '@/utils/handleTextLength';

interface TagType {
	title: string;
	color: `#${string}`;
}
interface Props extends NoteType {
	tags?: TagType[];
	maxTextLength: number;
}

const NoteListItem = ({ name, id, tags, maxTextLength }: Props) => {
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

	const handleTagTitle = (title: string, index: number) => {
		return index === 0
			? title.trim().slice(0, 5)
			: title.trim().slice(0, 1);
	};

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

		return score > 35 ? Colors.dark.primary : Colors.light.primary;
	};

	return (
		<View style={styles.container}>
			<View style={styles.folderContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						Colors.secondGray,
						false
					)}
					onPress={() => setIsOpen(!isOpen)}
				>
					<View style={styles.innerContainer}>
						<MaterialCommunityIcons
							name='text'
							size={24}
							color={
								colorScheme === 'light'
									? Colors.light.secondary
									: Colors.dark.secondary
							}
						/>
						<Text style={[styles.textS, styles.title]}>
							{handleTextLength(name, maxTextLength)}
						</Text>
						<View style={styles.tagsContainer}>
							{tags &&
								tags.map((tag, index) => (
									<View
										key={index}
										style={[
											index === 0
												? styles.tag
												: styles.tagSmall,
											{
												backgroundColor: tag.color,
												zIndex: -index,
												display:
													index >= 3
														? 'none'
														: undefined,
											},
										]}
									>
										<Text
											style={[
												styles.tagTitle,
												{
													color: calculateDarkLightText(
														tag.color
													),
												},
											]}
										>
											{handleTagTitle(tag.title, index)}
										</Text>
									</View>
								))}
							{!!tags?.length && tags.length >= 3 && (
								<Text style={styles.tagMore}>...</Text>
							)}
						</View>
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		textS: {
			fontSize: 16,
		},

		container: {
			width: '100%',
			overflow: 'hidden',
		},

		folderContainer: {
			width: '100%',
			backgroundColor:
				colorScheme === 'light' ? Colors.light.primary : undefined,
			borderRadius: 50,
			overflow: 'hidden',
			height: 32,
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
			color:
				colorScheme === 'light'
					? Colors.dark.primary
					: Colors.light.primary,
		},

		voidNotebookTitle: {
			marginLeft: 12,
			fontFamily: 'SatoshiMedium',
			color:
				colorScheme === 'light' ? Colors.firstGray : Colors.thirdGray,
			fontStyle: 'italic',
		},

		tagsContainer: {
			position: 'absolute',
			right: 16,
			display: 'flex',
			flexDirection: 'row',
		},

		tag: {
			marginLeft: 4,
			height: 18,
			backgroundColor: '#f00',
			borderRadius: 50,
			paddingHorizontal: 8,
		},

		tagSmall: {
			marginLeft: -8,
			height: 18,
			backgroundColor: '#f00',
			borderRadius: 20,
			paddingHorizontal: 6,
		},

		tagTitle: {
			fontFamily: 'SatoshiBold',
			fontSize: 12,
		},

		tagMore: {
			zIndex: -3,
			marginTop: 2,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontFamily: 'SatoshiBold',
			fontSize: 12,
		},
	});
}

export default NoteListItem;
