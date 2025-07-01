import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import useColorScheme from '@/hooks/useColorScheme';
import useMode from '@/hooks/useMode';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import ListChats from './ai/ListChats';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
	const { mode, setMode } = useMode();
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
									? COLORS.light.thirdGray
									: COLORS.dark.thirdGray
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
				>
					<View style={styles.avatarContainer}>
						{/* Gradient from red to blue */}
						<LinearGradient
							start={{ x: 0.1, y: 0 }}
							end={{ x: 1, y: 0.5 }}
							colors={[COLORS.light.mainColor, COLORS.dark.mainColorDark]}
							style={StyleSheet.absoluteFillObject}
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
			paddingBottom: 64,
			flex: 1,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
		},

		header: {
			width: '100%',
			paddingHorizontal: 8,
			height: 48,
			display: 'flex',
			flexDirection: 'row',
			gap: 8,
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
			fontFamily: FONTS.Montserrat,
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
			height: 80,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 16,
		},

		avatarContainer: {
			width: 48,
			height: 48,
			borderRadius: 24,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
}

export default DrawerContent;
