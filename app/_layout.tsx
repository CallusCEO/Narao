import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// custom imports
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import Colors from '@/constants/Colors';
import DrawerContent from '@/components/sidebar/DrawerContent';

export default function RootLayout() {
	const { colorScheme } = useContext(ColorSchemeContext);
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Drawer
					screenOptions={{
						drawerStyle: {
							backgroundColor:
								colorScheme === 'light'
									? Colors.light.primary
									: Colors.dark.primary,
						},
						headerShown: false,
						swipeEdgeWidth: 400,
					}}
					drawerContent={() => <DrawerContent />}
				></Drawer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
