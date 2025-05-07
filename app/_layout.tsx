import { ColorSchemeProvider } from '@/context/ColorSchemeContext';
import { Drawer } from 'expo-router/drawer';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// custom imports
import DrawerContent from '@/components/sidebar/DrawerContent';
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

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
		></Drawer>
	);
}
