// app/(tabs)/(notebooks)/index.tsx
import { useFonts } from 'expo-font';
import { useContext, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// custom imports
import BottomSheetComponent from '@/components/general/bottomPage/BottomSheetComponent';
import BottomSheetContentNotebook from '@/components/general/bottomPage/BottomSheetContentNotebook';
import PageHeader from '@/components/general/PageHeader';
import FolderListItem from '@/components/notePage/FolderListItem';
import NotebookListItem from '@/components/notePage/NotebookListItem';
import Colors from '@/constants/Colors';
import { data } from '@/constants/sampleNoteData';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
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
	const [targerId, setTargetId] = useState<number>(0);

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
					showsVerticalScrollIndicator={true}
				>
					{data.map((notebook) => (
						<TouchableWithoutFeedback
							onLongPress={() => {
								bottomSheetRef.current?.snapToIndex(0);
								setTargetId(notebook.id);
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
								content={notebook.content}
							/>
						</TouchableWithoutFeedback>
					))}
					{data.map((notebook) => (
						<TouchableWithoutFeedback
							onLongPress={() => {
								bottomSheetRef.current?.snapToIndex(0);
								setTargetId(notebook.id);
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
							<FolderListItem
								id={notebook.id}
								name={notebook.name + ' folder'}
								content={notebook.content}
							/>
						</TouchableWithoutFeedback>
					))}
				</ScrollView>
			</View>
			<BottomSheetComponent ref={bottomSheetRef}>
				<BottomSheetContentNotebook
					title={data[targerId].name || 'Error not found'}
					iconName={data[targerId].iconName || 'error-outline'}
					iconColor={data[targerId].iconColor || Colors.red}
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
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},
		AzeretMono: {
			fontFamily: 'AzeretMono',
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},
		Bespoke: {
			fontFamily: 'Bespoke',
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
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
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.primary
					: Colors.dark.primary,
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
