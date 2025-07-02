import DrawerContent from '@/components/DrawerContent';
import COLORS from '@/constants/COLORS';
import { ColorSchemeProvider } from '@/context/colorSchemeContext';
import { CurrentModelProvider } from '@/context/currentModelProvider';
import { ScreenModeProvider } from '@/context/screenModeContext';
import useColorScheme from '@/hooks/useColorScheme';
import useMode from '@/hooks/useMode';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Index from './index';

const Drawer = createDrawerNavigator();

export default function Layout() {
	return (
		<ScreenModeProvider>
			<CurrentModelProvider>
				<ColorSchemeProvider>
					<DrawerLayout />
				</ColorSchemeProvider>
			</CurrentModelProvider>
		</ScreenModeProvider>
	);
}
// Main drawer navigator
function DrawerLayout() {
	const colorScheme = useColorScheme();
	const { mode, setMode } = useMode();

	// native navigation bar on Android
	useEffect(() => {
		NavigationBar.setBackgroundColorAsync('transparent');
		NavigationBar.setButtonStyleAsync(colorScheme === 'light' ? 'dark' : 'light');
	}, [colorScheme]);

	return (
		<>
			<StatusBar
				backgroundColor={
					colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary
				}
				barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<Drawer.Navigator
				screenOptions={{
					swipeEdgeWidth: 364,
					drawerType: 'slide',

					drawerStyle: {
						backgroundColor:
							colorScheme === 'light' ? COLORS.light.primary : COLORS.dark.primary,
						width: '100%',
						borderColor: 'transparent',
					},
					headerShown: false,
				}}
				drawerContent={(props: any) => <DrawerContent {...props} />}
			>
				<Drawer.Screen name='Home' component={Index} />
			</Drawer.Navigator>
		</>
	);
}
