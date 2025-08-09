import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import USER_INFO from '@/constants/USER_INFO';
import useColorScheme from '@/hooks/useColorScheme';
import useMode from '@/hooks/useMode';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ListChats from './ai/ListChats';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
	const { mode, setMode } = useMode();
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

	// for the close handling
	const handlePressClose = () => {
		// setMode(mode === 'ai' ? 'notes' : 'ai');
		navigation.closeDrawer();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.searchBox}>
					<TextInput
						maxLength={75}
						placeholder='Search'
						placeholderTextColor={
							colorScheme === 'light' ? COLORS.light.thirdGray : COLORS.dark.thirdGray
						}
						cursorColor={
							colorScheme === 'light' ? COLORS.light.mainColor : COLORS.dark.mainColor
						}
						style={styles.searchBoxText}
						selectionColor={
							colorScheme === 'light' ? COLORS.light.mainColor : COLORS.dark.mainColor
						}
					></TextInput>
				</View>
				<View style={styles.closeButtonContainer}>
					<Pressable
						onPress={handlePressClose}
						style={styles.closeButton}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.secondGray
									: COLORS.dark.secondGray,
						}}
					>
						<Feather
							name='chevrons-right'
							size={32}
							color={
								colorScheme === 'light'
									? COLORS.light.secondary
									: COLORS.dark.secondary
							}
						/>
					</Pressable>
				</View>
			</View>
			{mode === 'ai' && <ListChats />}
			<View style={styles.footer}>
				<Pressable
					android_ripple={{
						color:
							colorScheme === 'light'
								? COLORS.light.secondGray
								: COLORS.dark.secondGray,
					}}
					style={styles.footerPressable}
				>
					<View style={styles.avatarContainer}>
						{/* Gradient from red to blue */}
						<LinearGradient
							start={{ x: 0.1, y: 0 }}
							end={{ x: 1, y: 0.5 }}
							colors={[
								colorScheme === 'light'
									? COLORS.light.mainColor
									: COLORS.dark.mainColor,
								colorScheme === 'light'
									? COLORS.light.mainColorDark
									: COLORS.dark.mainColorDark,
							]}
							style={StyleSheet.absoluteFillObject}
						/>
					</View>
					<Text style={styles.footerText}>{USER_INFO.name}</Text>
					<View style={styles.footerIconContainer}>
						<Feather
							name='settings'
							size={24}
							color={
								colorScheme === 'light'
									? COLORS.light.secondary
									: COLORS.dark.secondary
							}
						/>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			paddingTop: 40,
			paddingBottom: 48,
			flex: 1,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
		},

		header: {
			width: '100%',
			paddingHorizontal: 8,
			height: 56,
			display: 'flex',
			flexDirection: 'row',
			gap: 8,
			paddingBottom: 8,
			borderBottomWidth: 1,
			borderBottomColor:
				colorScheme === 'light' ? COLORS.light.firstGray : COLORS.dark.firstGray,
			// backgroundColor:
			// 	colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
		},

		searchBox: {
			flex: 1,
			backgroundColor:
				colorScheme === 'light' ? COLORS.light.firstGray : COLORS.dark.firstGray,
			borderColor: colorScheme === 'light' ? COLORS.light.secondGray : COLORS.dark.secondGray,
			borderWidth: 1,
			borderRadius: 50,
			justifyContent: 'center',
			alignItems: 'flex-start',
			paddingHorizontal: 16,
		},

		searchBoxText: {
			fontFamily: FONTS.MontserratMedium,
			fontSize: 14,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			fontWeight: '700',
			width: '100%',
		},

		closeButtonContainer: {
			overflow: 'hidden',
			borderRadius: 24,
		},

		closeButton: {
			justifyContent: 'center',
			alignItems: 'center',
			height: 48,
			width: 48,
		},

		footer: {
			width: '100%',
			height: 72,
			flexDirection: 'row',
			alignItems: 'center',
			// backgroundColor:
			// 	colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
		},

		avatarContainer: {
			width: 40,
			height: 40,
			borderRadius: 24,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
		},

		footerPressable: {
			flex: 1,
			height: 72,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 16,
			paddingRight: 24,
		},

		footerText: {
			fontFamily: FONTS.MontserratBold,
			fontSize: 14,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			fontWeight: '600',
			textAlign: 'left',
			marginLeft: 16,
		},

		footerIconContainer: {
			marginLeft: 'auto',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
}

export default DrawerContent;
