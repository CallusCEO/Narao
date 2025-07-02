import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import useColorScheme from '@/hooks/useColorScheme';
import { Message } from '@/types/chatTypes';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { useFonts } from 'expo-font';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ChatMessage = ({ props }: { props: Message }) => {
	const [fontsLoaded] = useFonts({
		MontserratBold: require('@/assets/fonts/montserrat/Montserrat-Bold.ttf'),
		MontserratLight: require('@/assets/fonts/montserrat/Montserrat-Light.ttf'),
		MontserratMedium: require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
		MontserratRegular: require('@/assets/fonts/montserrat/Montserrat-Regular.ttf'),
		MontserratSemiBold: require('@/assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
	});

	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<>
			{props.role === 'user' ? (
				<View style={styles.containerUser}>
					<Pressable
						style={styles.MessageContainer}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.mainColorDark
									: COLORS.dark.mainColorDark,
						}}
					>
						<Text style={styles.MessageText}>{props.text}</Text>
					</Pressable>
				</View>
			) : (
				<View style={styles.containerAI}>
					<Pressable
						style={styles.MessageContainer}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.secondGray
									: COLORS.dark.secondGray,
						}}
					>
						<Text style={styles.MessageText}>{props.text}</Text>
					</Pressable>
				</View>
			)}
		</>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		containerUser: {
			borderRadius: 20,
			overflow: 'hidden',
			marginBottom: 16,
			marginRight: 8,
			marginLeft: 'auto',
			maxWidth: '80%',
			backgroundColor:
				colorScheme === 'light' ? COLORS.light.firstGray : COLORS.dark.firstGray,
		},

		containerAI: {
			overflow: 'hidden',
			marginBottom: 16,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
		},

		MessageContainer: {
			paddingHorizontal: 16,
			paddingVertical: 12,
			flex: 1,
		},

		MessageText: {
			fontFamily: FONTS.MontserratMedium,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			fontSize: 16,
			lineHeight: 24,
		},
	});
}

export default ChatMessage;
