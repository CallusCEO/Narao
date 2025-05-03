import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// custom imports
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import Colors from '@/constants/Colors';

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
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons size={size} name='timer-sand' color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name='calendar'
					options={{
						title: 'Calendar',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons size={size} name='calendar' color={color} />
						),
					}}
				/>

				<Tabs.Screen
					name='ai'
					options={{
						title: 'Llucas',
						popToTopOnBlur: true,
						tabBarIcon: ({ color, size }) => (
							<MaterialCommunityIcons size={size} name='asterisk' color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
