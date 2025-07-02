import COLORS from '@/constants/COLORS';
import LIST_CHATS from '@/constants/LIST_CHATS';
import useColorScheme from '@/hooks/useColorScheme';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ListItemChat from './ListItemChat';

const ListChats = () => {
	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.containerScrollable}
				contentContainerStyle={styles.contentContainerStyle}
			>
				{LIST_CHATS.map((chat) => (
					<ListItemChat key={chat.id} props={chat} />
				))}
			</ScrollView>
			<LinearGradient
				colors={[
					colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
					'transparent',
				]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.gradientTop}
			/>
			<LinearGradient
				colors={[
					colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
					'transparent',
				]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={styles.gradientBottom}
			/>
		</View>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			position: 'relative',
		},

		containerScrollable: {
			flex: 1,
			paddingHorizontal: 8,
		},

		contentContainerStyle: {
			paddingVertical: 16,
		},

		gradientTop: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: 16,
			pointerEvents: 'none',
		},

		gradientBottom: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: 16,
			pointerEvents: 'none',
		},
	});
}

export default ListChats;
