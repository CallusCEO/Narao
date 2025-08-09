import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import useColorScheme from '@/hooks/useColorScheme';
import { Message } from '@/types/chatTypes';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { Feather } from '@expo/vector-icons';
// import Clipboard from '@react-native-clipboard/clipboard';
import { useFonts } from 'expo-font';
import React, { useRef, useState } from 'react';
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	ToastAndroid,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

const ChatMessage = ({ props }: { props: Message }) => {
	const [fontsLoaded] = useFonts({
		MontserratBold: require('@/assets/fonts/montserrat/Montserrat-Bold.ttf'),
		MontserratLight: require('@/assets/fonts/montserrat/Montserrat-Light.ttf'),
		MontserratMedium: require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
		MontserratRegular: require('@/assets/fonts/montserrat/Montserrat-Regular.ttf'),
		MontserratSemiBold: require('@/assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
	});

	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
	const messageRef = useRef<View | null>(null);

	const handleLongPress = () => {
		if (messageRef.current) {
			messageRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
				setPopoverPosition({ x: pageX, y: pageY + _height });
				setPopoverVisible(true);
			});
		}
	};

	const closePopover = () => setPopoverVisible(false);

	const copyToClipboard = (text: string) => {
		// Clipboard.setString(text);
		ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
	};

	const selectText = (text: string) => {
		// Clipboard.setString(text);
		ToastAndroid.show('Selected text', ToastAndroid.SHORT);
	};

	if (!fontsLoaded) return null;

	return (
		<View>
			<View style={props.role === 'user' ? styles.containerUser : styles.containerAI}>
				<Pressable
					style={styles.MessageContainer}
					android_ripple={{
						color:
							colorScheme === 'light'
								? COLORS.light.mainColorDark
								: COLORS.dark.mainColorDark,
					}}
					onLongPress={handleLongPress}
					ref={messageRef}
				>
					<Text style={styles.MessageText}>{props.text}</Text>
				</Pressable>
			</View>

			<Modal visible={popoverVisible} transparent animationType='fade'>
				<TouchableWithoutFeedback onPress={closePopover}>
					<View style={styles.overlay}>
						<View
							style={[
								styles.popover,
								{
									top: popoverPosition.y - 24,
									left: props.role === 'user' ? 164 : 24,
								},
							]}
						>
							<Pressable
								style={styles.popoverItem}
								android_ripple={{
									color:
										colorScheme === 'light'
											? COLORS.light.mainColorDark
											: COLORS.dark.mainColorDark,
								}}
								onPress={() => {
									copyToClipboard(props.text);
									closePopover();
								}}
							>
								<Feather
									name='copy'
									size={24}
									color={
										colorScheme === 'light'
											? COLORS.light.mainColor
											: COLORS.dark.mainColor
									}
								/>
								<Text style={styles.popoverText}>Copy</Text>
							</Pressable>
							<Pressable
								style={styles.popoverItem}
								android_ripple={{
									color:
										colorScheme === 'light'
											? COLORS.light.mainColorDark
											: COLORS.dark.mainColorDark,
								}}
								onPress={() => {
									selectText(props.text);
									closePopover();
								}}
							>
								<Feather
									name='mouse-pointer'
									size={24}
									color={
										colorScheme === 'light'
											? COLORS.light.mainColor
											: COLORS.dark.mainColor
									}
								/>
								<Text style={styles.popoverText}>Select text</Text>
							</Pressable>
							{props.role === 'user' ? (
								<Pressable
									style={styles.popoverItem}
									android_ripple={{
										color:
											colorScheme === 'light'
												? COLORS.light.mainColorDark
												: COLORS.dark.mainColorDark,
									}}
									onPress={() => {
										selectText(props.text);
										closePopover();
									}}
								>
									<Feather
										name='edit'
										size={24}
										color={
											colorScheme === 'light'
												? COLORS.light.mainColor
												: COLORS.dark.mainColor
										}
									/>
									<Text style={styles.popoverText}>Edit</Text>
								</Pressable>
							) : (
								<Pressable
									style={styles.popoverItem}
									android_ripple={{
										color:
											colorScheme === 'light'
												? COLORS.light.mainColorDark
												: COLORS.dark.mainColorDark,
									}}
									onPress={() => {
										selectText(props.text);
										closePopover();
									}}
								>
									<Feather
										name='refresh-cw'
										size={24}
										color={
											colorScheme === 'light'
												? COLORS.light.mainColor
												: COLORS.dark.mainColor
										}
									/>
									<Text style={styles.popoverText}>Generate again</Text>
								</Pressable>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
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
		overlay: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
		},
		popover: {
			overflow: 'hidden',
			position: 'absolute',
			backgroundColor:
				colorScheme === 'light' ? COLORS.light.firstGray : COLORS.dark.firstGray,
			borderRadius: 10,
			elevation: 5,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 4,
			minWidth: 164,
			paddingVertical: 8,
		},
		popoverItem: {
			paddingVertical: 8,
			paddingHorizontal: 16,
			flexDirection: 'row',
			alignItems: 'center',
			gap: 8,
		},
		popoverText: {
			fontFamily: FONTS.MontserratMedium,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
		},
	});
}

export default ChatMessage;
