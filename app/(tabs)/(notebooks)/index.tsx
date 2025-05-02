import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import NotebookListItem from '@/components/notePage/NotebookListItem';

export default function NotePage() {
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

	return (
		<View style={styles.container}>
			<View style={styles.notebooksContainer}>
				<ScrollView
					style={styles.notebooksScroller}
					contentContainerStyle={{ paddingBottom: '150%', paddingTop: '10%' }}
					showsVerticalScrollIndicator={false}
				>
					<NotebookListItem
						id={`nb${1}`}
						iconColor='#eee'
						name='Notebook i.g'
						iconName='book'
					/>
				</ScrollView>
			</View>
		</View>
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
