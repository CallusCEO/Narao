import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import Rule from '../general/Rule';
import ChatContent from './ChatContent';
import NotebookContent from './NotebookContent';
import NotebookTitle from './NotebookTitle';
import SearchContent from './SearchContent';

const DrawerContent = () => {
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	return (
		<>
			<View style={styles.container}>
				<NotebookTitle id={0} />
				<Rule />
				<NotebookContent notebookId={0} />
				<ChatContent id={0} />
			</View>
			<View style={styles.secondContainer}>
				<SearchContent />
			</View>
		</>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			paddingTop: 32,
			paddingHorizontal: 12,
			flex: 1,
			width: '100%',
			height: '100%',
			backgroundColor: colorScheme === 'light' ? Colors.light.ternary : Colors.firstGray,
		},

		secondContainer: {
			width: '100%',
			backgroundColor: colorScheme === 'light' ? Colors.light.ternary : Colors.firstGray,
		},
	});
}

export default DrawerContent;
