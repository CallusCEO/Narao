// app/(tabs)/(notebooks)/index.tsx
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContext, useRef, useState } from 'react';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import NotebookListItem from '@/components/notePage/NotebookListItem';
import BottomSheetComponent from '@/components/general/BottomSheetComponent';
import BottomSheet from '@gorhom/bottom-sheet';

export default function NotebookPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);
	const [isOpen, setOpen] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.notebooksContainer}>
				{/* Reduce padding to make content more visible */}
				<ScrollView
					style={styles.notebooksScroller}
					contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
					showsVerticalScrollIndicator={true}
				>
					<Text style={[styles.Satoshi, styles.textXL, styles.header]}>
						Your Notebooks
					</Text>

					<NotebookListItem
						id={`nb${1}`}
						iconColor='#abffe5'
						name='Notebook i.g etc name '
						iconName='school'
						ref={bottomSheetRef}
					/>
				</ScrollView>
			</View>
			<BottomSheetComponent ref={bottomSheetRef} />
		</GestureHandlerRootView>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
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
			width: '100%',
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
