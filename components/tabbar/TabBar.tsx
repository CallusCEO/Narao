import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLinkBuilder } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { useFonts } from 'expo-font';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabBarItem from './TabBarItem';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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

	const [dimensions, setDimensions] = useState({ height: 20, width: 10 });

	const buttonWidth = dimensions.width / state.routes.length;
	const onTabBarLayout = (e: LayoutChangeEvent) => {
		setDimensions({
			height: e.nativeEvent.layout.height,
			width: e.nativeEvent.layout.width,
		});
	};

	const tabPositionX = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: tabPositionX.value }],
		};
	});

	return (
		<View onLayout={onTabBarLayout} style={styles.tabBar}>
			{/* <Animated.View
				style={[
					{
						top: 4,
						position: 'absolute',
						backgroundColor:
							colorScheme === 'light' ? Colors.mainDistilled : Colors.mainDistilled,
						borderRadius: 50,
						marginHorizontal: 12,
						height: dimensions.height - 40,
						width: buttonWidth - 24,
					},
					animatedStyle,
				]}
			></Animated.View> */}
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });

					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabBarItem
						key={route.name}
						onPress={onPress}
						onLongPress={onLongPress}
						isFocused={isFocused}
						routeName={route.name}
						color={isFocused ? Colors.main : Colors.thirdGray}
						label={String(label)}
					/>
				);
			})}
		</View>
	);
}

type ColorScheme = 'light' | 'dark' | undefined | null;

const createStyles = (colorScheme: ColorScheme) =>
	StyleSheet.create({
		tabBar: {
			borderColor: colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			borderTopWidth: 1,
			position: 'absolute',
			bottom: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
			paddingVertical: 20,
			paddingBottom: 72,
			elevation: 25,
			paddingHorizontal: 16,
		},
	});
