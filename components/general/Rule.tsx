import { StyleSheet, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

const Rule = () => {
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	return <View style={styles.rule} />;
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		rule: {
			width: '95%',
			height: 1,
			backgroundColor: Colors.fourthGray,
			marginHorizontal: 'auto',
		},
	});
}

export default Rule;
