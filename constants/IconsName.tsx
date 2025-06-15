import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	isFocused: boolean;
	color: string;
}

export const icon: { [key: string]: (props: Props) => React.ReactElement } = {
	'(notebooks)': (props: Props) => (
		<MaterialCommunityIcons
			name={props.isFocused ? 'notebook' : 'notebook-outline'}
			size={28}
			color={props.color}
		/>
	),
	timer: (props: Props) => (
		<Ionicons
			name={props.isFocused ? 'timer' : 'timer-outline'}
			size={28}
			color={props.color}
		/>
	),
	calendar: (props: Props) => (
		<Ionicons
			name={props.isFocused ? 'calendar-clear' : 'calendar-clear-outline'}
			size={28}
			color={props.color}
		/>
	),
	ai: (props: Props) => (
		<Ionicons
			name={props.isFocused ? 'sparkles' : 'sparkles-outline'}
			size={28}
			color={props.color}
		/>
	),
};
