// components/general/BottomSheetContent.tsx
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import React, { useContext, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import Rule from '../Rule';

interface Props {
	title: string;
	iconName?: string;
	iconColor?: string;
}

const BottomSheetContentNotebook: React.FC<Props> = ({
	title,
	iconName,
	iconColor,
}) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		SatoshiRegular: require('@/assets/fonts/Satoshi-Regular.otf'),
		SatoshiMedium: require('@/assets/fonts/Satoshi-Medium.otf'),
		SatoshiBold: require('@/assets/fonts/Satoshi-Bold.otf'),
		SatoshiBlack: require('@/assets/fonts/Satoshi-Black.otf'),
	});
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);

	// states:
	const [editOpen, setEditOpen] = useState(false);
	const [text, setText] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<MaterialIcons
					/* @ts-ignore */
					name={iconName}
					size={42}
					color={iconColor}
				/>
				<Text style={styles.title}>{title}</Text>
			</View>
			<Rule />
			<View style={styles.settingsContainer}>
				<View style={styles.settingItem}>
					<View style={styles.settingDesc}>
						<Text style={styles.settingDescTitle}>Rename</Text>
						<Text style={styles.settingDescText}>
							Change the name of you notebook.
						</Text>
					</View>
					<View style={styles.settingButtonContainer}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								Colors.blueDistilled,
								false
							)}
							onPress={() => setEditOpen(!editOpen)}
						>
							<View style={styles.settingButton}>
								<MaterialIcons
									name={editOpen ? 'close' : 'edit'}
									size={28}
									color={
										editOpen
											? Colors.red
											: colorScheme === 'light'
											? Colors.firstGray
											: Colors.dark.secondary
									}
								/>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
				{editOpen && (
					<View style={styles.editcontainer}>
						<BottomSheetTextInput
							value={text}
							onChangeText={(text) => setText(text)}
							style={styles.settingTextInput}
							maxLength={30}
							placeholder='i.e. My Notebook'
							placeholderTextColor={Colors.thirdGray}
						/>
						<View style={styles.settingButtonContainer}>
							<TouchableNativeFeedback
								background={TouchableNativeFeedback.Ripple(
									Colors.greenDistilled,
									false
								)}
								onPress={() =>
									text.length && setEditOpen(false)
								}
							>
								<View style={styles.settingButton}>
									<MaterialIcons
										name='check'
										size={28}
										color={Colors.green}
									/>
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
				)}
				<View style={styles.settingItem}>
					<View style={styles.settingDesc}>
						<Text style={styles.settingDescTitle}>Change icon</Text>
						<Text style={styles.settingDescText}>
							Select a new icon for your notebook.
						</Text>
					</View>
					<View style={styles.settingButtonContainer}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								Colors.blueDistilled,
								false
							)}
						>
							<View style={styles.settingButton}>
								<MaterialIcons
									name='add-reaction'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.firstGray
											: Colors.dark.secondary
									}
								/>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
				<View style={styles.settingItem}>
					<View style={styles.settingDesc}>
						<Text style={styles.settingDescTitle}>
							Change Icon Color
						</Text>
						<Text style={styles.settingDescText}>
							Choose a new color for your notebook icon.
						</Text>
					</View>
					<View style={styles.settingButtonContainer}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								Colors.blueDistilled,
								false
							)}
						>
							<View style={styles.settingButton}>
								<MaterialIcons
									name='color-lens'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.firstGray
											: Colors.dark.secondary
									}
								/>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
				<View style={styles.settingItem}>
					<View style={styles.settingDesc}>
						<Text
							style={[
								styles.settingDescTitle,
								styles.settingDescTitleDelete,
							]}
						>
							Delete
						</Text>
						<Text
							style={[
								styles.settingDescText,
								styles.settingDescTextDelete,
							]}
						>
							This action will be irreversible.
						</Text>
					</View>
					<View
						style={[
							styles.settingButtonContainer,
							styles.settingButtonContainerDelete,
						]}
					>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(
								Colors.redDistilled,
								false
							)}
						>
							<View style={styles.settingButton}>
								<MaterialIcons
									name='delete'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.red
											: Colors.red
									}
								/>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: width > 450 ? 12 : 0,
		},

		titleContainer: {
			paddingBottom: 6,
			paddingHorizontal: 12,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 8,
		},

		title: {
			marginLeft: 12,
			fontFamily: 'SatoshiBold',
			fontSize: 22,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},

		settingsContainer: {
			flex: 1,
			paddingTop: 16,
			paddingHorizontal: width > 450 ? 16 : 8,
		},

		settingItem: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: width > 450 ? 12 : 4,
			paddingRight: width > 450 ? 16 : 12,
			paddingBottom: 12,
			borderBottomWidth: 1,
			borderBottomColor: Colors.thirdGray,
			height: 80,
			backgroundColor:
				colorScheme === 'light'
					? Colors.light.primary
					: Colors.firstGray,
			marginBottom: 12,
		},

		settingDesc: {
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			paddingLeft: 12,
		},

		settingDescTitle: {
			fontFamily: 'SatoshiBold',
			fontSize: 18,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},

		settingDescTitleDelete: {
			color: Colors.red,
		},

		settingDescText: {
			fontFamily: 'SatoshiRegular',
			fontSize: 16,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			opacity: 0.8,
		},

		settingDescTextDelete: { color: Colors.red, opacity: 0.7 },

		settingButtonContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: 64,
			height: 48,
			borderRadius: 10,
			backgroundColor: 'rgba(50, 50, 50, 0.5)',
			overflow: 'hidden',
			borderColor: Colors.thirdGray,
			borderWidth: 1,
		},

		settingButtonContainerDelete: {
			borderColor: Colors.red,
			backgroundColor: 'rgba(50, 50, 50, 0.3)',
		},

		settingButton: {
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},

		// additional styles for settings

		editcontainer: {
			width: '100%',
			height: 64,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingLeft: width > 450 ? 16 : 8,
			paddingRight: width > 450 ? 16 : 12,
			marginBottom: 56,
			marginTop: 8,
			borderRadius: 10,
			backgroundColor: Colors.secondGray,
		},

		settingTextInput: {
			flex: 1,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			fontFamily: 'SatoshiRegular',
			fontSize: 16,
		},
	});
}

export default BottomSheetContentNotebook;
