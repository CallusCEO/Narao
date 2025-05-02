import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookType } from '@/types/ContentType';

interface Props extends NotebookType {
	iconColor: string;
	iconName: string;
}

const NotebookListItem = ({ iconColor, iconName, name, id, content }: Props) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	return <View style={styles.container}></View>;
};

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
			width: '90%',
			height: 40,
			backgroundColor: Colors.light.primary,
		},
	});
}

export default NotebookListItem;
