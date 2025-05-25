import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NoteType } from '@/types/ContentType';
import handleTextLength from '@/utils/handleTextLength';

interface TagType {
	title: string;
	color: `#${string}`;
}
interface Props extends NoteType {
	tags?: TagType[];
}

const ChatDrawerListItem = ({ name, id, tags }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);

	// states :

	return (
		<View style={styles.container}>
			<View style={styles.chatContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light' ? Colors.thirdGray : Colors.secondGray,
						false
					)}
					// onPress={() => setIsOpen(!isOpen)}
				>
					<View style={styles.innerContainer}>
						<MaterialCommunityIcons
							name='asterisk'
							size={20}
							color={colorScheme === 'light' ? Colors.redDistilled : Colors.red}
						/>
						<Text style={[styles.textS, styles.title]}>
							{handleTextLength(name, 25)}
						</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		textS: {
			fontSize: 16,
		},

		container: {
			width: '100%',
			overflow: 'hidden',
		},

		chatContainer: {
			width: '100%',
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.thirdGray,
			borderRadius: 50,
			overflow: 'hidden',
			height: 32,
		},

		innerContainer: {
			width: '100%',
			height: '100%',
			paddingHorizontal: 16,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			position: 'relative',
		},

		title: {
			marginLeft: 8,
			fontFamily: 'SatoshiMedium',
			color: colorScheme === 'light' ? Colors.dark.primary : Colors.light.primary,
		},
	});
}

export default ChatDrawerListItem;
