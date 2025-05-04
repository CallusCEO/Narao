import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ColorSchemeProvider } from '@/context/ColorSchemeContext';

// custom imports
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import Colors from '@/constants/Colors';
import DrawerContent from '@/components/sidebar/DrawerContent';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<RootLayoutNav />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</ColorSchemeProvider>
	);
}

function RootLayoutNav() {
	const { colorScheme } = useContext(ColorSchemeContext);

	return (
		<Drawer
			screenOptions={{
				drawerStyle: {
					backgroundColor:
						colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
				},
				headerShown: false,
				swipeEdgeWidth: 400,
			}}
			drawerContent={() => <DrawerContent />}
		>
			<Drawer.Screen name='(tabs)' options={{ headerShown: false }} />
		</Drawer>
	);
}
