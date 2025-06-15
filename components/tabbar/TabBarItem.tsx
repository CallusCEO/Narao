import { useLinkBuilder } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';

// custom imports
import { icon } from '@/constants/IconsName';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useFonts } from 'expo-font';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

interface TabBarItemProps {
	onPress: () => void;
	onLongPress: () => void;
	isFocused: boolean;
	routeName: string;
	color: string;
	label: string;
}

export default function TabBarItem({
	onPress,
	onLongPress,
	isFocused,
	routeName,
	label,
	color,
}: TabBarItemProps) {
	const { buildHref } = useLinkBuilder();
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});

	// animation
	const scale = useSharedValue(0);

	useEffect(() => {
		scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
			duration: 350,
		});
	}, [scale, isFocused]);

	const animatedTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scale.value, [0, 1], [1, 0]);

		return {
			opacity,
		};
	});

	const animatedIconStyle = useAnimatedStyle(() => {
		const top = interpolate(scale.value, [0, 1], [0, -4]);
		const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

		return {
			transform: [{ scale: scaleValue }],
			top,
		};
	});

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabItem}>
			<Animated.View style={animatedIconStyle}>
				{icon[routeName]({
					color: color,
					isFocused: isFocused,
				})}
			</Animated.View>
			{/* <Animated.Text
				style={[
					{
						color: colorScheme ? Colors.thirdGray : Colors.thirdGray,
						fontFamily: 'SatoshiBold',
						fontSize: 12,
					},
					animatedTextStyle,
				]}
			>
				{label}
			</Animated.Text> */}
		</Pressable>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

const createStyles = (colorScheme: ColorScheme) =>
	StyleSheet.create({
		tabItem: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
