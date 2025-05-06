import { useFonts } from 'expo-font';
import React, { useContext } from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

interface Props {
	title: string;
}
const PageHeader = ({ title }: Props) => {
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
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.drawerIconContainer}>
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(
						colorScheme === 'light'
							? Colors.fourthGray
							: Colors.thirdGray,
						false
					)}
					onPress={() =>
						navigation.dispatch(DrawerActions.openDrawer())
					}
				>
					<View style={styles.drawerIcon}>
						<MaterialCommunityIcons
							name='menu'
							size={width > 450 ? 42 : 36}
							color={
								colorScheme === 'light'
									? Colors.light.secondary
									: Colors.dark.secondary
							}
						/>
					</View>
				</TouchableNativeFeedback>
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>
	);
};

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 12,
			paddingHorizontal: width > 450 ? 26 : 20,
			height: width > 450 ? 64 : 56,
		},

		titleContainer: {
			flex: 1,
			marginLeft: 16,
		},

		title: {
			fontFamily: 'SatoshiBold',
			fontSize: 22,
			color:
				colorScheme === 'light'
					? Colors.light.secondary
					: Colors.dark.secondary,
		},

		drawerIconContainer: {
			width: width > 450 ? 54 : 48,
			height: width > 450 ? 54 : 48,
			borderRadius: 30,
			overflow: 'hidden',
		},

		drawerIcon: {
			borderRadius: 50,
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
}

export default PageHeader;
