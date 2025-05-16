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
import NoteListItem from '@/components/notePage/NoteListItem';
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

	// Recursive renderer types
	type TargetSetter = (id?: number) => void;
	interface RenderContext {
		notebookId: number;
		parentFolderId?: number;
		setTargetNotebook: TargetSetter;
		setTargetFolder: TargetSetter;
		setTargetNote: TargetSetter;
		setTargetType: (t: 'notebook' | 'folder' | 'note') => void;
		bottomSheetRef: React.RefObject<BottomSheet | null>;
	}

	// Recursive render function
	const renderTree = (
		items: ContentType[] | undefined,
		ctx: RenderContext,
		maxTextLength: number
	): React.ReactNode => {
		if (!items) return null;

		return items.map((item) => {
			if (item.folder) {
				const { id, name, content } = item.folder;
				return (
					<TouchableWithoutFeedback
						key={`folder-${ctx.notebookId}-${id}`}
						onLongPress={() => {
							ctx.bottomSheetRef.current?.snapToIndex(0);
							ctx.setTargetNotebook(ctx.notebookId);
							ctx.setTargetFolder(id);
							ctx.setTargetNote(undefined);
							ctx.setTargetType('folder');
						}}
						style={styles.row}
					>
						<FolderListItem
							id={id}
							name={name}
							content={content}
							maxTextLength={maxTextLength}
						>
							{renderTree(content, { ...ctx, parentFolderId: id }, maxTextLength - 4)}
						</FolderListItem>
					</TouchableWithoutFeedback>
				);
			}

			if (item.note) {
				const { id, name, tags } = item.note;
				return (
					<TouchableWithoutFeedback
						key={`note-${ctx.notebookId}-${ctx.parentFolderId}-${id}`}
						onLongPress={() => {
							ctx.bottomSheetRef.current?.snapToIndex(0);
							ctx.setTargetNotebook(ctx.notebookId);
							ctx.setTargetFolder(ctx.parentFolderId);
							ctx.setTargetNote(id);
							ctx.setTargetType('note');
						}}
						style={styles.row}
					>
						<NoteListItem
							id={id}
							name={name}
							tags={tags}
							maxTextLength={maxTextLength}
						/>
					</TouchableWithoutFeedback>
				);
			}

			return null;
		});
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<PageHeader title='NaraBook' />
			<View style={styles.notebooksContainer}>
				<ScrollView
					style={styles.notebooksScroller}
					contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
					showsVerticalScrollIndicator={false}
				>
					{data.map((notebook) => (
						<TouchableWithoutFeedback
							key={notebook.id}
							onLongPress={() => {
								bottomSheetRef.current?.snapToIndex(0);
								setTargetIdNotebook(notebook.id);
								setTargetIdFolder(undefined);
								setTargetIdNote(undefined);
								setTarget('notebook');
							}}
							style={styles.row}
						>
							<NotebookListItem
								id={notebook.id}
								name={notebook.name}
								iconName={notebook.iconName}
								iconColor={notebook.iconColor}
							>
								{renderTree(
									notebook.content,
									{
										notebookId: notebook.id,
										parentFolderId: undefined,
										bottomSheetRef,
										setTargetNotebook: setTargetIdNotebook,
										setTargetFolder: setTargetIdFolder,
										setTargetNote: setTargetIdNote,
										setTargetType: setTarget,
									},
									20
								)}
							</NotebookListItem>
						</TouchableWithoutFeedback>
					))}
				</ScrollView>
			</View>
			<BottomSheetComponent ref={bottomSheetRef}>
				<BottomSheetContentNarabook
					title={
						targetIdFolder !== undefined
							? targetIdNote !== undefined
								? data[targetIdNotebook ?? 0]?.content?.[targetIdFolder ?? 0]
										?.folder?.content?.[targetIdNote ?? 0]?.note?.name ||
								  'Error not found'
								: data[targetIdNotebook ?? 0]?.content?.[targetIdFolder ?? 0]
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
		row: {
			marginBottom: 12,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
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
		},
		notebooksScroller: {
			marginHorizontal: 'auto',
			width: '95%',
			height: '100%',
		},
	});
}
