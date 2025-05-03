// components/BottomSheetContent.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';

interface BottomSheetContentProps {
	onClose: () => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose }) => {
	return (
		<View style={styles.contentContainer}>
			<Text style={styles.title}>Bottom Sheet Title</Text>
			<Text style={styles.description}>
				This is the content of the bottom sheet. You can put any components here.
			</Text>
			<Button title='Close' onPress={onClose} />
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		padding: 16,
		alignItems: 'center',
		backgroundColor: Colors.thirdGray,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		marginBottom: 24,
		textAlign: 'center',
	},
});

export default BottomSheetContent;
