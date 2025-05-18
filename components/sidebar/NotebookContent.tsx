import { useFonts } from 'expo-font';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { data } from '@/constants/sampleNoteData';
import { ChatDrawerOpenContext } from '@/context/ChatDrawerOpenContext';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookOpenContext } from '@/context/NotebookOpenContext';
import { ContentType } from '@/types/ContentType';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Rule from '../general/Rule';
import FolderDrawerListItem from './FolderDrawerListItem';
import NoteDrawerListItem from './NoteDrawerListItem';

interface Props {
	notebookId: number;
}

const NotebookContent = ({ notebookId }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const { isNotebookOpen, setNotebookOpen } = useContext(NotebookOpenContext);
	const { isChatDrawerOpen, setChatDrawerOpen } = useContext(ChatDrawerOpenContext);
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	// functions :

	const renderContent = (maxTextLength: number, items?: ContentType[]) => {
		if (!items) return null;

		return items.map((item) => {
			// Folder case
			if (item.folder) {
				const { id, name, content } = item.folder;
				return (
					<FolderDrawerListItem
						key={`folder-${id}`}
						name={name}
						id={id}
						maxTextLength={maxTextLength}
					>
						{/* recurse into this folder’s content */}
						{renderContent(Math.round(maxTextLength / 1.8), content)}
					</FolderDrawerListItem>
				);
			}

			// Note case
			if (item.note) {
				const { id, name, tags } = item.note;
				return (
					<NoteDrawerListItem
						key={`note-${id}`}
						id={id}
						name={name}
						tags={tags}
						maxTextLength={maxTextLength}
					/>
				);
			}

			// Fallback
			return null;
		});
	};

	return (
		<View style={[styles.container, { height: isNotebookOpen ? 'auto' : 30 }]}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
					false
				)}
				onPress={() => {
					setNotebookOpen(!isNotebookOpen);
					setChatDrawerOpen(false);
				}}
			>
				<View style={styles.dropdown}>
					<MaterialIcons
						name='keyboard-arrow-down'
						color={
							colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary
						}
						size={28}
						style={{ transform: [{ rotate: isNotebookOpen ? '0deg' : '-90deg' }] }}
					/>
					<Text style={styles.text}>Notes</Text>
				</View>
			</TouchableNativeFeedback>
			{isNotebookOpen && <Rule />}
			{isNotebookOpen && (
				<ScrollView contentContainerStyle={styles.innerContainer}>
					{renderContent(20, data[notebookId]?.content)}
				</ScrollView>
			)}
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			maxHeight: '50%',
			display: 'flex',
			width: '100%',
			backgroundColor: colorScheme === 'light' ? 'transparent' : Colors.secondGray,
			marginTop: 12,
			borderRadius: 10,
			overflow: 'hidden',
			borderWidth: colorScheme === 'light' ? 1 : 0,
			borderColor: colorScheme === 'light' ? Colors.secondGray : 'transparent',
		},

		dropdown: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingRight: 12,
			paddingLeft: 4,
		},

		innerContainer: {
			paddingVertical: 8,
			paddingHorizontal: 12,
			backgroundColor: colorScheme === 'light' ? 'transparent' : Colors.secondGray,
		},

		text: {
			fontFamily: 'SatoshiMedium',
			fontSize: 14,
			marginRight: 8,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},

		rule: {
			flex: 1,
			height: 1,
			backgroundColor:
				colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
	});
}

export default NotebookContent;
