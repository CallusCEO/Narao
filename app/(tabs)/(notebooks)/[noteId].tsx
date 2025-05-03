import {
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	ScrollView,
	TextInput,
} from 'react-native';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import TitleContainer from '@/components/notePage/TitleContainer';
import Rule from '@/components/general/Rule';
import { useLocalSearchParams } from 'expo-router';

export default function NotePage() {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);
	const { noteId } = useLocalSearchParams(); // grasping the prop from the dynamic path

	// some placeholders for now
	const title = 'Note Title';
	const iconColor = '#6666ff';

	return (
		<View style={styles.container}>
			<TitleContainer iconColor={iconColor} title={title} />
			<Rule />

			<View style={styles.noteContainer}>
				<ScrollView
					style={styles.noteScroller}
					contentContainerStyle={{ paddingBottom: '150%', paddingTop: '10%' }}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.titleInputContainer}>
						<TextInput
							style={[styles.titleInput, styles.textXXXL, styles.Satoshi]}
							multiline
							placeholder='New note'
							maxLength={100}
							placeholderTextColor={Colors.secondGray}
						/>
					</View>
					<Text style={[styles.Satoshi, styles.textS]}>
						Here is the note screen Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						{/* Rest of the text content */}
					</Text>
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
		topContainer: {
			paddingHorizontal: 16,
			paddingVertical: 0,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			display: 'flex',
			flexDirection: 'column',
		},

		topInnerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative', // important for absolute positioning the icon
			marginBottom: 8,
			width: '100%',
		},

		topLeftInnerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginRight: 12,
		},

		topRightInnerContainer: {
			position: 'absolute',
			right: 8,
			borderRadius: 50,
			overflow: 'hidden',
		},

		noteTitle: {
			marginLeft: 8,
			fontWeight: 'bold',
		},

		noteContainer: {
			width: '100%',
			height: '100%',
			paddingHorizontal: '5%',
			display: 'flex',
			flexDirection: 'column',
		},

		noteScroller: {
			width: '100%',
			height: '100%',
		},

		titleInputContainer: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			paddingVertical: 8,
		},

		titleInput: {
			width: '100%',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
	});
}
