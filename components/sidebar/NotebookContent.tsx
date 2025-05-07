import { useFonts } from 'expo-font';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { ContentType } from '@/types/ContentType';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import FolderListItem from '../notePage/FolderListItem';
import NoteListItem from '../notePage/NoteListIem';

interface Props {
	id: number;
}

const NotebookContent = ({ id }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	// states :
	const [isOpen, setOpen] = useState(false);

	// functions :
	const handleNameLength = (name: string): string => {
		return name.trim().length < 17 ? name.trim() : name.slice(0, 17).trim() + '...';
	};

	const generateContentListNote = (
		content: ContentType[] | undefined,
		notebookId: number,
		folderId: number
	) => {
		return content?.map((folder) => (
			<TouchableWithoutFeedback
				key={`note${folder.note?.id}`}
				style={{
					marginBottom: 12,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<NoteListItem
					id={folder.note?.id || 0}
					name={folder.note?.name || 'Error not found'}
					tags={folder.note?.tags}
				></NoteListItem>
			</TouchableWithoutFeedback>
		));
	};

	const generateContentListFolder = (content: ContentType[] | undefined, notebookId: number) => {
		return content?.map((notebook) => (
			<TouchableWithoutFeedback
				key={`folder${notebook.folder?.id}`}
				style={{
					marginBottom: 12,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<FolderListItem
					id={notebook.folder?.id || 0}
					name={notebook.folder?.name || 'Error not found'}
					content={notebook.folder?.content}
				>
					{generateContentListNote(
						notebook.folder?.content,
						notebookId,
						notebook.folder?.id || 0
					)}
				</FolderListItem>
			</TouchableWithoutFeedback>
		));
	};

	return (
		<View style={styles.container}>
			{isOpen && <View>{generateContentListFolder(generateContentListNote(id), id)}</View>}
		</View>
	);
};

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
			color: colorScheme === 'light' ? Colors.dark.primary : Colors.light.primary,
		},

		dropdownIconContainer: {
			position: 'absolute',
			right: 16,
		},
	});
}

export default NotebookContent;
