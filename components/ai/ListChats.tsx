import COLORS from '@/constants/COLORS';
import LIST_CHATS from '@/constants/LIST_CHATS';
import useColorScheme from '@/hooks/useColorScheme';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { useFonts } from 'expo-font';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ListItemChat from './ListItemChat';

const ListChats = () => {
	const [fontsLoaded] = useFonts({
		Montserrat: require('@/assets/fonts/Montserrat-VariableFont_wght.ttf'),
		Atkinson: require('@/assets/fonts/AtkinsonHyperlegibleMono-VariableFont_wght.ttf'),
	});

	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
			{LIST_CHATS.map((chat) => (
				<ListItemChat key={chat.id} props={chat} />
			))}
		</ScrollView>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
			paddingHorizontal: 8,
		},

		contentContainerStyle: {
			paddingVertical: 16,
		},
	});
}

export default ListChats;
