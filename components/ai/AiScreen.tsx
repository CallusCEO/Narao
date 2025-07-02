import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import LIST_CHATS from '@/constants/LIST_CHATS';
import useColorScheme from '@/hooks/useColorScheme';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import ChatMessage from './ChatMessage';

const AiScreen = () => {
	const [inputText, setInputText] = useState('');
	const [fontsLoaded] = useFonts({
		MontserratBold: require('@/assets/fonts/montserrat/Montserrat-Bold.ttf'),
		MontserratMedium: require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
	});

	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	if (!fontsLoaded) {
		return null;
	}

	const handleSend = () => {
		if (inputText.trim() === '') return;
		// Handle message sending logic
		console.log('User message:', inputText);
		setInputText('');
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			keyboardVerticalOffset={0}
		>
			{/* Main content would go here */}
			<ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
				{LIST_CHATS[0].data.map((message) => (
					<ChatMessage key={message.id} props={message} />
				))}
			</ScrollView>

			{/* Input bar */}
			<View style={styles.inputContainer}>
				<TextInput
					value={inputText}
					onChangeText={setInputText}
					placeholder='Ask Llucas anything...'
					placeholderTextColor={
						colorScheme === 'light' ? COLORS.light.secondGray : COLORS.dark.secondGray
					}
					style={styles.input}
					multiline
					maxLength={1500}
					selectionColor={
						colorScheme === 'light' ? COLORS.light.mainColor : COLORS.dark.mainColor
					}
					cursorColor={
						colorScheme === 'light' ? COLORS.light.mainColor : COLORS.dark.mainColor
					}
				/>
				<View style={styles.sendButtonContainer}>
					<Pressable
						onPress={handleSend}
						style={inputText.length > 0 ? styles.sendButton : styles.sendButtonDisabled}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.secondGray
									: COLORS.dark.secondGray,
						}}
					>
						<Feather
							name='arrow-up'
							size={24}
							color={
								colorScheme === 'light'
									? COLORS.light.mainColor
									: COLORS.dark.mainColor
							}
						/>
					</Pressable>
				</View>
			</View>
			<LinearGradient
				colors={[
					colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
					'transparent',
				]}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={styles.gradientBottom}
			/>
		</KeyboardAvoidingView>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	const isLight = colorScheme === 'light';
	return StyleSheet.create({
		container: {
			position: 'relative',
			flex: 1,
			backgroundColor: isLight ? COLORS.light.primary : COLORS.dark.primary,
		},

		content: {
			flex: 1,
			// Placeholder for future message list or scroll view
		},

		inputContainer: {
			zIndex: 999,
			flexDirection: 'row',
			alignItems: 'flex-end',
			paddingHorizontal: 8,
			paddingVertical: 8,
			backgroundColor: isLight ? COLORS.light.firstGray : COLORS.dark.firstGray,
			borderRadius: 24,
			marginHorizontal: 8,
		},

		input: {
			flex: 1,
			minHeight: 40,
			maxHeight: 120,
			borderRadius: 20,
			paddingHorizontal: 16,
			paddingVertical: 10,
			color: isLight ? COLORS.light.secondary : COLORS.dark.secondary,
			fontFamily: FONTS.MontserratMedium,
		},

		sendButtonContainer: {
			borderRadius: 24,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
		},

		sendButton: {
			width: 40,
			height: 40,
			backgroundColor: isLight ? COLORS.light.secondary : COLORS.dark.secondary,
			justifyContent: 'center',
			alignItems: 'center',
		},

		sendButtonDisabled: {
			width: 40,
			height: 40,
			backgroundColor: isLight ? COLORS.light.secondGray : COLORS.dark.secondGray,
			justifyContent: 'center',
			alignItems: 'center',
		},

		gradientBottom: {
			position: 'absolute',
			bottom: 56,
			width: '100%',
			height: 24,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
			pointerEvents: 'none',
		},

		contentContainerStyle: {
			justifyContent: 'flex-start',
			paddingVertical: 8,
		},
	});
}

export default AiScreen;
