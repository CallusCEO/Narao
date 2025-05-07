import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

export default function TabLayout() {
	const { colorScheme } = useContext(ColorSchemeContext);

	return (
		<>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor:
							colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
						elevation: 0,
						height: 62,
					},
					tabBarActiveTintColor: Colors.blue,
				}}
				backBehavior='history'
			>
				<Tabs.Screen
					name='(notebooks)'
					options={{
						title: 'NaraBook',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons size={size} name='text' color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name='timer'
					options={{
						title: 'Timer',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size, focused }) => (
							<MaterialCommunityIcons
								size={size}
								name={focused ? 'timer-sand-complete' : 'timer-sand'}
								color={color}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name='calendar'
					options={{
						title: 'Calendar',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size, focused }) => (
							<MaterialCommunityIcons
								size={size}
								name={focused ? 'calendar-multiple' : 'calendar'}
								color={color}
							/>
						),
					}}
				/>

				<Tabs.Screen
					name='ai'
					options={{
						title: 'Llucas',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons size={size} name='assistant' color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
