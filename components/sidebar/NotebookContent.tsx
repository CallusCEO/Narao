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
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
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

	const generateContentListNote = (
		content: ContentType[] | undefined,
		notebookId: number,
		folderId: number
	) => {
		return content?.map((folder) => (
			<TouchableWithoutFeedback
				key={`note${folder.note?.id}`}
				style={{
					marginBottom: 4,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<NoteDrawerListItem
					id={folder.note?.id || 0}
					name={folder.note?.name || 'Error not found'}
					tags={folder.note?.tags}
				></NoteDrawerListItem>
			</TouchableWithoutFeedback>
		));
	};

	const generateFolders = () => {
		return data[notebookId]?.content?.map((notebook, index) => (
			<TouchableWithoutFeedback key={index}>
				<FolderDrawerListItem
					name={notebook.folder?.name || 'Error not found'}
					id={notebook.folder?.id || 0}
				>
					{generateContentListNote(
						notebook.folder?.content,
						notebookId,
						notebook.folder?.id || 0
					)}
				</FolderDrawerListItem>
			</TouchableWithoutFeedback>
		));
	};

	return (
		<View style={[styles.container, { height: isNotebookOpen ? 'auto' : 30 }]}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(Colors.thirdGray, false)}
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
					<Text style={styles.text}>Notes & Folders</Text>
				</View>
			</TouchableNativeFeedback>
			{isNotebookOpen && <Rule />}
			{isNotebookOpen && (
				<ScrollView style={styles.innerContainer}>{generateFolders()}</ScrollView>
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
			backgroundColor: Colors.secondGray,
			marginTop: 12,
			borderRadius: 10,
			overflow: 'hidden',
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
			backgroundColor: Colors.secondGray,
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
