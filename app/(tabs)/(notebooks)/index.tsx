import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView, Button } from 'react-native';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { useContext, useRef, useCallback } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import NotebookListItem from '@/components/notePage/NotebookListItem';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheetContent from '@/components/general/BottomSheetContent'; // Adjust the import path

export default function NotebookPage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);

	const styles = createStyles(colorScheme);

	const title = 'Note Title';
	const iconColor = '#6666ff';

	// bottom sheet
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// points for the bottom sheet to snap to, expressed as percentages of the screen height
	const snapPoints = ['25%', '50%', '90%'];

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleClosePress = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, []);

	return (
		<BottomSheetModalProvider>
			<View style={styles.container}>
				<View style={styles.notebooksContainer}>
					<ScrollView
						style={styles.notebooksScroller}
						contentContainerStyle={{ paddingBottom: '150%', paddingTop: '10%' }}
						showsVerticalScrollIndicator={false}
					>
						<NotebookListItem
							id={`nb${1}`}
							iconColor='#abffe5'
							name='Notebook i.g etc name '
							iconName='school'
						/>
						<Button title='Open Bottom Sheet' onPress={handlePresentModalPress} />

						<BottomSheetModal
							ref={bottomSheetModalRef}
							index={1} // The initial snap point (index 1 is '50%')
							snapPoints={snapPoints}
							// Optional: Add backdrop for dimming the background
							// backdropComponent={renderBackdrop}
						>
							<BottomSheetContent onClose={handleClosePress} />
						</BottomSheetModal>
					</ScrollView>
				</View>
			</View>
		</BottomSheetModalProvider>
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

			// borderColor: '#111',
			// borderWidth: 1,
			// borderStyle: 'solid',
		},

		notebooksScroller: {
			width: '100%',
			height: '100%',
		},
	});
}
