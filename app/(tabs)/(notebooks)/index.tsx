// app/(tabs)/(notebooks)/index.tsx
import { useFonts } from 'expo-font';
import { useContext, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// custom imports
import BottomSheetComponent from '@/components/general/bottomPage/BottomSheetComponent';
import BottomSheetContentNarabook from '@/components/general/bottomPage/BottomSheetContentNarabook';
import PageHeader from '@/components/general/PageHeader';
import FolderListItem from '@/components/notePage/FolderListItem';
import NotebookListItem from '@/components/notePage/NotebookListItem';
import NoteListItem from '@/components/notePage/NoteListIem';
import Colors from '@/constants/Colors';
import { data } from '@/constants/sampleNoteData';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { ContentType } from '@/types/ContentType';
import BottomSheet, { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';

export default function NotebookPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [targetIdNotebook, setTargetIdNotebook] = useState<number | undefined>(undefined);
	const [targetIdFolder, setTargetIdFolder] = useState<number | undefined>(undefined);
	const [targetIdNote, setTargetIdNote] = useState<number | undefined>(undefined);
	const [target, setTarget] = useState<'notebook' | 'folder' | 'note'>('notebook');

	// functions :
	const generateContentListNote = (
		content: ContentType[] | undefined,
		notebookId: number,
		folderId: number
	) => {
		return content?.map((folder) => (
			<TouchableWithoutFeedback
				onLongPress={() => {
					bottomSheetRef.current?.snapToIndex(0);
					setTargetIdNote(folder.note?.id);
					setTargetIdFolder(folderId);
					setTargetIdNotebook(notebookId);
					setTarget('note');
				}}
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
				onLongPress={() => {
					bottomSheetRef.current?.snapToIndex(0);
					setTargetIdFolder(notebook.folder?.id);
					setTargetIdNotebook(notebookId);
					setTargetIdNote(undefined);
					setTarget('folder');
				}}
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

	const generateContentListNotebook = () => {
		return data.map((notebook) => (
			<TouchableWithoutFeedback
				onLongPress={() => {
					bottomSheetRef.current?.snapToIndex(0);
					setTargetIdNotebook(notebook.id);
					setTargetIdNote(undefined);
					setTargetIdFolder(undefined);
					setTarget('notebook');
				}}
				key={notebook.id}
				style={{
					marginBottom: 12,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<NotebookListItem
					id={notebook.id}
					iconColor={notebook.iconColor}
					name={notebook.name}
					iconName={notebook.iconName}
				>
					{generateContentListFolder(notebook.content, notebook.id)}
				</NotebookListItem>
			</TouchableWithoutFeedback>
		));
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<PageHeader title='NaraBook' />
			<View style={styles.notebooksContainer}>
				<ScrollView
					style={styles.notebooksScroller}
					contentContainerStyle={{
						paddingBottom: 100,
						paddingTop: 20,
					}}
					showsVerticalScrollIndicator={false}
				>
					{generateContentListNotebook()}
				</ScrollView>
			</View>
			<BottomSheetComponent ref={bottomSheetRef}>
				<BottomSheetContentNarabook
					title={
						targetIdFolder !== undefined
							? targetIdNote !== undefined
								? data[targetIdNotebook ?? 1]?.content?.[targetIdFolder ?? 1]
										?.folder?.content?.[targetIdNote ?? 0]?.note?.name ||
								  'Error not found'
								: data[targetIdNotebook ?? 1]?.content?.[targetIdFolder ?? 1]
										?.folder?.name || 'Error not found'
							: data[targetIdNotebook ?? 0].name || 'Error not found'
					}
					/*@ts-ignore */
					iconName={
						targetIdFolder !== undefined
							? targetIdNote !== undefined
								? 'text'
								: 'folder'
							: data[targetIdNotebook ?? 0].iconName || 'error-outline'
					}
					iconColor={
						targetIdFolder !== undefined
							? colorScheme === 'light'
								? Colors.light.secondary
								: Colors.dark.secondary
							: data[targetIdNotebook ?? 0].iconColor || Colors.red
					}
					target={target}
				/>
			</BottomSheetComponent>
		</GestureHandlerRootView>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		Satoshi: {
			fontFamily: 'Satoshi',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
		AzeretMono: {
			fontFamily: 'AzeretMono',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
		Bespoke: {
			fontFamily: 'Bespoke',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
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

		header: {
			marginBottom: 16,
			fontWeight: 'bold',
		},

		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			paddingTop: 40,
		},

		notebooksContainer: {
			width: '100%',
			height: '100%',
			paddingHorizontal: '5%',
			display: 'flex',
			flexDirection: 'column',
		},

		notebooksScroller: {
			marginHorizontal: 'auto',
			width: '95%',
			height: '100%',
		},

		buttonContainer: {
			marginTop: 20,
			alignItems: 'center',
		},

		button: {
			backgroundColor: Colors.blue,
			paddingVertical: 12,
			paddingHorizontal: 24,
			borderRadius: 8,
			alignItems: 'center',
			width: '70%',
		},

		buttonText: {
			color: 'white',
			fontFamily: 'Satoshi',
			fontSize: 16,
			fontWeight: 'bold',
		},
	});
}
