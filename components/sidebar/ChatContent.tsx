import { useFonts } from 'expo-font';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ChatDrawerOpenContext } from '@/context/ChatDrawerOpenContext';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookOpenContext } from '@/context/NotebookOpenContext';
import { MaterialIcons } from '@expo/vector-icons';
import Rule from '../general/Rule';
import ChatDrawerListItem from './ChatDrawerListItem';

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
	const { isNotebookOpen, setNotebookOpen } = useContext(NotebookOpenContext);
	const { isChatDrawerOpen, setChatDrawerOpen } = useContext(ChatDrawerOpenContext);
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	return (
		<View style={[styles.container, { height: isChatDrawerOpen ? 'auto' : 30 }]}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple(
					colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
					false
				)}
				onPress={() => {
					setChatDrawerOpen(!isChatDrawerOpen);
					setNotebookOpen(false);
				}}
			>
				<View style={styles.dropdown}>
					<MaterialIcons
						name='keyboard-arrow-down'
						color={
							colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary
						}
						size={28}
						style={{ transform: [{ rotate: isChatDrawerOpen ? '0deg' : '-90deg' }] }}
					/>
					<Text style={styles.text}>Chats</Text>
				</View>
			</TouchableNativeFeedback>
			{isChatDrawerOpen && <Rule />}
			{isChatDrawerOpen && (
				<View style={styles.innerContainer}>
					<ChatDrawerListItem name='Chat 1' id={0} />
				</View>
			)}
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			maxHeight: '60%',
			display: 'flex',
			width: '100%',
			backgroundColor: colorScheme === 'light' ? 'transparent' : Colors.secondGray,
			marginTop: 12,
			borderRadius: 10,
			overflow: 'hidden',
			borderWidth: colorScheme === 'light' ? 1 : 0,
			borderColor: colorScheme === 'light' ? Colors.secondGray : 'transparent',
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
			backgroundColor: colorScheme === 'light' ? 'transparent' : Colors.secondGray,
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
