// components/general/BottomSheetContent.tsx
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import handleTextLength from '@/utils/handleTextLength';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Rule from '../Rule';

interface Props {
	title: string;
	iconName?: string;
	iconColor?: string;
	target: 'notebook' | 'folder' | 'note';
}

const BottomSheetContentNarabook: React.FC<Props> = ({ title, iconName, iconColor, target }) => {
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
				<View style={styles.IconContainer}>
					<MaterialCommunityIcons
						/* @ts-ignore */
						name={iconName}
						size={28}
						color={iconColor}
					/>
				</View>
				<Text style={styles.title}>{handleTextLength(title, 17)}</Text>
			</View>
			<Rule />
			<View style={styles.settingsContainer}>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<MaterialIcons
									name='create-new-folder'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Create Folder</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<MaterialCommunityIcons
									name='note-plus'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Create Note</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
			<View style={styles.settingsContainer}>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<MaterialIcons
									name='drive-file-rename-outline'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Rename</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<MaterialIcons
									name='insert-emoticon'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Change Icon</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<Ionicons
									name='color-palette-outline'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Change Icon Color</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
							false
						)}
					>
						<View style={styles.innerContainer}>
							<View>
								<MaterialIcons
									name='delete'
									size={28}
									color={
										colorScheme === 'light'
											? Colors.light.secondary
											: Colors.dark.secondary
									}
								/>
							</View>

							<Text style={[styles.settingTitle]}>Delete</Text>
						</View>
					</TouchableNativeFeedback>
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
			paddingHorizontal: 16,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 8,
		},

		IconContainer: {
			padding: 4,
			borderRadius: 10,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.secondGray,
		},

		title: {
			marginLeft: 12,
			fontFamily: 'SatoshiBold',
			fontSize: 20,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
		},

		settingsContainer: {
			marginTop: 16,
			width: '95%',
			marginHorizontal: 'auto',
			backgroundColor: colorScheme === 'light' ? Colors.sixthGray : Colors.firstGray,
			borderRadius: 20,
			borderColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderWidth: 1,
			overflow: 'hidden',
		},

		settingItem: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			height: 54,
			overflow: 'hidden',
			borderBottomColor: colorScheme === 'light' ? Colors.fifthGray : Colors.secondGray,
			borderBottomWidth: 1,
		},

		innerContainer: {
			flex: 1,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			height: 54,
			paddingHorizontal: 16,
		},

		settingTitle: {
			marginLeft: 8,
			fontFamily: 'SatoshiBold',
			fontSize: 16,
			color: colorScheme === 'light' ? Colors.light.secondary : Colors.dark.secondary,
			letterSpacing: 1,
		},
	});
}

export default BottomSheetContentNarabook;
