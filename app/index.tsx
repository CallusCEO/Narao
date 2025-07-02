import AiScreen from '@/components/ai/AiScreen';
import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import MODELS from '@/constants/MODELS';
import useAIModel from '@/hooks/useAIModel';
import useColorScheme from '@/hooks/useColorScheme';
import useMode from '@/hooks/useMode';
import { AllAIModelsType } from '@/types/allAIModelsType';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

export default function Index({ navigation }: { navigation: any }) {
	const { mode } = useMode();
	const { model, setModel } = useAIModel();
	const [fontsLoaded] = useFonts({
		MontserratBold: require('@/assets/fonts/montserrat/Montserrat-Bold.ttf'),
		MontserratMedium: require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
	});
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownOpacity = useSharedValue(0);
	const dropdownScale = useSharedValue(0);
	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	const dropdownAnimatedStyle = useAnimatedStyle(() => ({
		opacity: dropdownOpacity.value,
		transform: [{ scale: dropdownScale.value }],
	}));

	if (!fontsLoaded) {
		return null;
	}

	const handlePressOpenDrawer = () => {
		navigation.openDrawer();
	};

	const handlePressToggleDropdown = () => {
		if (!isDropdownOpen) {
			setShowDropdown(true);
			dropdownOpacity.value = withTiming(1, {
				duration: 200,
				easing: Easing.out(Easing.ease),
			});
			dropdownScale.value = withTiming(1, {
				duration: 200,
				easing: Easing.out(Easing.ease),
			});
			setIsDropdownOpen(true);
		} else {
			dropdownOpacity.value = withTiming(
				0,
				{ duration: 100, easing: Easing.out(Easing.ease) },
				(finished) => {
					if (finished) {
						runOnJS(setShowDropdown)(false);
					}
				}
			);
			dropdownScale.value = withTiming(0.8, {
				duration: 100,
				easing: Easing.out(Easing.ease),
			});
			setIsDropdownOpen(false);
		}
	};

	const handlePressDropdownItem = (model: AllAIModelsType) => {
		setModel(model);
		handlePressToggleDropdown();
	};

	return (
		<View style={[styles.container]}>
			<View style={styles.header}>
				<View style={styles.headerButtonContainer}>
					<Pressable
						onPress={handlePressOpenDrawer}
						style={styles.openDrawerButton}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.secondGray
									: COLORS.dark.secondGray,
						}}
					>
						<Feather
							name='chevrons-left'
							size={32}
							color={
								colorScheme === 'light'
									? COLORS.light.secondary
									: COLORS.dark.secondary
							}
						/>
					</Pressable>
				</View>
				{mode === 'ai' && (
					<View style={styles.headerAIButtonContainer}>
						<Pressable
							onPress={handlePressToggleDropdown}
							style={styles.changeAIButton}
							android_ripple={{
								color:
									colorScheme === 'light'
										? COLORS.light.secondGray
										: COLORS.dark.secondGray,
							}}
						>
							<Text style={styles.headerAIText}>{MODELS[model]}</Text>
							<Feather
								name='chevron-down'
								size={24}
								color={
									colorScheme === 'light'
										? COLORS.light.secondary
										: COLORS.dark.secondary
								}
							/>
						</Pressable>
					</View>
				)}
				{mode === 'ai' && (
					<View style={styles.headerButtonContainer}>
						<Pressable
							onPress={handlePressOpenDrawer}
							style={styles.openDrawerButton}
							android_ripple={{
								color:
									colorScheme === 'light'
										? COLORS.light.secondGray
										: COLORS.dark.secondGray,
							}}
						>
							<Feather
								name='edit'
								size={24}
								color={
									colorScheme === 'light'
										? COLORS.light.secondary
										: COLORS.dark.secondary
								}
							/>
						</Pressable>
					</View>
				)}
				{showDropdown && (
					<Animated.View style={[styles.dropdown, dropdownAnimatedStyle]}>
						<Pressable
							style={styles.dropdownItem}
							onPress={() => handlePressDropdownItem('gemini-2.0-flash-lite')}
							android_ripple={{
								color:
									colorScheme === 'light'
										? COLORS.light.secondGray
										: COLORS.dark.secondGray,
							}}
						>
							<Ionicons
								name='leaf'
								size={16}
								color={
									colorScheme === 'light'
										? COLORS.light.mainColorDark
										: COLORS.dark.mainColorDark
								}
							/>
							<Text style={styles.dropdownItemText}>Gemini 2.0 Flash Lite</Text>
						</Pressable>
						<View style={styles.separator} />
						<Pressable
							style={styles.dropdownItem}
							onPress={() => handlePressDropdownItem('gemini-2.0-flash')}
							android_ripple={{
								color:
									colorScheme === 'light'
										? COLORS.light.secondGray
										: COLORS.dark.secondGray,
							}}
						>
							<FontAwesome6
								name='bolt'
								size={16}
								color={
									colorScheme === 'light'
										? COLORS.light.mainColorDark
										: COLORS.dark.mainColorDark
								}
							/>
							<Text style={styles.dropdownItemText}>Gemini 2.0 Flash</Text>
						</Pressable>
					</Animated.View>
				)}
			</View>
			{/* content */}
			{mode === 'ai' && <AiScreen />}
		</View>
	);
}

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
			paddingTop: 40,
			paddingBottom: 48,
		},

		header: {
			width: '100%',
			height: 56,
			display: 'flex',
			flexDirection: 'row',
			gap: 8,
			paddingBottom: 8,
			paddingHorizontal: 8,
			alignItems: 'center',
			justifyContent: 'space-between',
			position: 'relative',
		},

		headerButtonContainer: {
			width: 48,
			height: 48,
			borderRadius: 24,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
		},

		headerAIButtonContainer: {
			height: 32,
			borderRadius: 10,
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative',
		},

		openDrawerButton: {
			justifyContent: 'center',
			alignItems: 'center',
			height: 48,
			width: 48,
		},

		changeAIButton: {
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
			flexDirection: 'row',
			gap: 8,
			paddingHorizontal: 8,
		},

		headerAIText: {
			fontFamily: FONTS.MontserratBold,
			fontSize: 14,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			textAlign: 'center',
		},

		dropdown: {
			position: 'absolute',
			top: 64,
			borderRadius: 30,
			zIndex: 999,
			overflow: 'hidden',
			width: '90%',
			borderWidth: 1,
			borderColor: colorScheme === 'light' ? COLORS.light.secondGray : COLORS.dark.secondGray,
			marginHorizontal: '7.5%',
			backgroundColor: colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
		},

		dropdownItem: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			paddingVertical: 16,
			paddingHorizontal: 24,
			gap: 8,
		},

		dropdownItemText: {
			fontFamily: FONTS.MontserratMedium,
			fontSize: 14,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			textAlign: 'center',
		},

		separator: {
			width: '90%',
			alignSelf: 'center',
			borderWidth: 0.5,
			borderColor: colorScheme === 'light' ? COLORS.light.secondGray : COLORS.dark.secondGray,
		},
	});
}
