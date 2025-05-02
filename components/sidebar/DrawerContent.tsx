import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';

const DrawerContent = () => {
	const { colorScheme } = useContext(ColorSchemeContext);

	const styles = createStyles(colorScheme); // Assuming 'light' for demonstration

	return (
		<View style={styles.container}>
			<Text>Hello There</Text>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		container: {
			marginTop: 32,
			flex: 1,
			width: '100%',
			height: '100%',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
		},
	});
}

export default DrawerContent;
