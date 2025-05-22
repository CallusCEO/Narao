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
import handleTextLength from '@/utils/handleTextLength';
import {
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Rule from '../Rule';

interface Props {
	title: string;
	iconName?: string;
	iconColor?: string;
	target: 'notebook' | 'folder' | 'note';
}

const BottomSheetContentNarabook: React.FC<Props> = ({
	title,
	iconName,
	iconColor,
	target,
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
				{/* <View style={styles.settingItem}>
					<View style={styles.settingDesc}>
						<Text style={styles.settingDescTitle}>Rename</Text>
					</View>
					<View style={styles.settingButtonContainer}>
						<TouchableNativeFeedback
							background={TouchableNativeFeedback.Ripple(Colors.blueDistilled, false)}
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
								onPress={() => text.length && setEditOpen(false)}
							>
								<View style={styles.settingButton}>
									<MaterialIcons name='check' size={28} color={Colors.green} />
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
				)}
				{target !== 'folder' && target !== 'note' && (
					<>
						<View style={styles.settingItem}>
							<View style={styles.settingDesc}>
								<Text style={styles.settingDescTitle}>Change icon</Text>
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
								<Text style={styles.settingDescTitle}>Change Icon Color</Text>
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
					</>
				)} */}
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.thirdGray,
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
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.thirdGray,
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

							<Text style={[styles.settingTitle]}>
								Change Icon
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.thirdGray,
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

							<Text style={[styles.settingTitle]}>
								Change Icon Color
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={[styles.settingItem]}>
					<TouchableNativeFeedback
						background={TouchableNativeFeedback.Ripple(
							colorScheme === 'light'
								? Colors.fifthGray
								: Colors.thirdGray,
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
			backgroundColor:
				colorScheme === 'light' ? Colors.sixthGray : Colors.secondGray,
		},

		title: {
			marginLeft: 12,
			fontFamily: 'SatoshiBold',
			fontSize: 20,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},

		settingsContainer: {
			flex: 1,
			paddingTop: 12,
			paddingHorizontal: width > 450 ? 16 : 8,
		},

		settingItem: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			height: 54,
			marginBottom: 12,
			borderRadius: 20,
			borderColor:
				colorScheme === 'light' ? Colors.fifthGray : Colors.thirdGray,
			borderWidth: 1,
			overflow: 'hidden',
		},

		innerContainer: {
			flex: 1,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			height: 54,
			paddingHorizontal: 12,
		},

		settingTitle: {
			marginLeft: 8,
			fontFamily: 'SatoshiBold',
			fontSize: 16,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
			letterSpacing: 1,
		},
	});
}

export default BottomSheetContentNarabook;
