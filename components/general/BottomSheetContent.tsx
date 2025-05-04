// components/general/BottomSheetContent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

// custom imports
import Colors from '@/constants/Colors';

interface BottomSheetContentProps {
	onClose: () => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose }) => {
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	return (
		<View style={styles.contentContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Create New Notebook</Text>
				<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<MaterialIcons
						name='close'
						size={24}
						color={
							colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary
						}
					/>
				</TouchableOpacity>
			</View>

			<Text style={styles.description}>Choose options for your new notebook below.</Text>

			{/* Example content items - replace with your actual content */}
			<View style={styles.optionsContainer}>
				<View style={styles.optionItem}>
					<MaterialIcons name='color-lens' size={24} color={Colors.blue} />
					<Text style={styles.optionText}>Choose Color</Text>
				</View>

				<View style={styles.optionItem}>
					<MaterialIcons name='label' size={24} color={Colors.blue} />
					<Text style={styles.optionText}>Add Tags</Text>
				</View>

				<View style={styles.optionItem}>
					<MaterialIcons name='folder' size={24} color={Colors.blue} />
					<Text style={styles.optionText}>Select Category</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.createButton} onPress={onClose}>
				<Text style={styles.createButtonText}>Create Notebook</Text>
			</TouchableOpacity>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		contentContainer: {
			flex: 1,
			padding: 20,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.dark.primary,
		},
		headerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 20,
		},
		title: {
			fontSize: 22,
			fontWeight: 'bold',
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
		closeButton: {
			padding: 5,
		},
		description: {
			fontSize: 16,
			marginBottom: 30,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
			opacity: 0.8,
		},
		optionsContainer: {
			marginBottom: 30,
		},
		optionItem: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 12,
			borderBottomWidth: 1,
			borderBottomColor: Colors.fourthGray,
		},
		optionText: {
			fontSize: 16,
			marginLeft: 12,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},
		createButton: {
			backgroundColor: Colors.blue,
			paddingVertical: 14,
			borderRadius: 8,
			alignItems: 'center',
			marginTop: 20,
		},
		createButtonText: {
			color: 'white',
			fontSize: 16,
			fontWeight: 'bold',
		},
	});
}

export default BottomSheetContent;
