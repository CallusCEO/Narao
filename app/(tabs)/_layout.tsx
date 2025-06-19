import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';

// custom imports
import TabBar from '@/components/tabbar/TabBar';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

export default function TabLayout() {
	const { colorScheme } = useContext(ColorSchemeContext);

	return (
		<>
			<StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />

			<Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name='(notebooks)'
					options={{
						title: 'Narabook',
					}}
				/>

				<Tabs.Screen
					name='timer'
					options={{
						title: 'Timer',
					}}
				/>

				<Tabs.Screen
					name='calendar'
					options={{
						title: 'Calendar',
					}}
				/>

				<Tabs.Screen
					name='ai'
					options={{
						title: 'Llucas',
					}}
				/>
			</Tabs>
		</>
	);
}
