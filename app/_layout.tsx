import { ColorSchemeProvider } from '@/context/ColorSchemeContext';
import { Drawer } from 'expo-router/drawer';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// custom imports
import DrawerContent from '@/components/sidebar/DrawerContent';
import Colors from '@/constants/Colors';
import { ChatDrawerOpenProvider } from '@/context/ChatDrawerOpenContext';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { NotebookOpenProvider } from '@/context/NotebookOpenContext';
import { TimerProvider } from '@/context/TimerContext';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<SafeAreaProvider>
				<ChatDrawerOpenProvider>
					<TimerProvider>
						<NotebookOpenProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<RootLayoutNav />
							</GestureHandlerRootView>
						</NotebookOpenProvider>
					</TimerProvider>
				</ChatDrawerOpenProvider>
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
						colorScheme === 'light'
							? Colors.light.primary
							: Colors.dark.primary,
				},
				headerShown: false,
				swipeEdgeWidth: 100,
			}}
			drawerContent={() => <DrawerContent />}
		></Drawer>
	);
}
