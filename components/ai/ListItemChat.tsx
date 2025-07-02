import COLORS from '@/constants/COLORS';
import FONTS from '@/constants/FONTS';
import useColorScheme from '@/hooks/useColorScheme';
import { ChatType } from '@/types/chatTypes';
import { ColorSchemeType } from '@/types/colorSchemeType';
import { ISOtoAmericanDate } from '@/utils/dateFormatHandling';
import handleTextLength from '@/utils/handleTextLength';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const ListItemChat = ({ props }: { props: ChatType }) => {
	const [fontsLoaded] = useFonts({
		MontserratBold: require('@/assets/fonts/montserrat/Montserrat-Bold.ttf'),
		MontserratLight: require('@/assets/fonts/montserrat/Montserrat-Light.ttf'),
		MontserratMedium: require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
		MontserratRegular: require('@/assets/fonts/montserrat/Montserrat-Regular.ttf'),
		MontserratSemiBold: require('@/assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
	});

	// styles
	const colorScheme = useColorScheme();
	const styles = createStyles(colorScheme);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<View style={styles.container}>
			<Pressable
				style={styles.pressable}
				android_ripple={{
					color:
						colorScheme === 'light' ? COLORS.light.secondGray : COLORS.dark.secondGray,
				}}
			>
				<View style={styles.pressableTextContainer}>
					<Text style={styles.text}>{handleTextLength(props.title, 35)}</Text>
					<Text style={styles.date}>{ISOtoAmericanDate(props.date)}</Text>
				</View>
				<View style={styles.pressableIconContainer}>
					<Pressable
						style={styles.pressableIcon}
						android_ripple={{
							color:
								colorScheme === 'light'
									? COLORS.light.secondGray
									: COLORS.dark.secondGray,
						}}
					>
						<MaterialCommunityIcons
							name='dots-vertical'
							size={24}
							color={
								colorScheme === 'light'
									? COLORS.light.thirdGray
									: COLORS.dark.thirdGray
							}
						/>
					</Pressable>
				</View>
			</Pressable>
		</View>
	);
};

function createStyles(colorScheme: ColorSchemeType) {
	return StyleSheet.create({
		container: {
			height: 72,
			borderRadius: 10,
			overflow: 'hidden',
			marginBottom: 8,
		},

		pressable: {
			flex: 1,
			padding: 8,
			paddingLeft: 16,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},

		text: {
			fontFamily: FONTS.MontserratMedium,
			fontSize: 16,
			color: colorScheme === 'light' ? COLORS.light.secondary : COLORS.dark.secondary,
			fontWeight: '600',
			width: '100%',
		},

		date: {
			fontFamily: FONTS.MontserratMedium,
			fontSize: 12,
			color: colorScheme === 'light' ? COLORS.light.mainColorDark : COLORS.dark.mainColorDark,
			fontWeight: '600',
			width: '100%',
		},

		pressableTextContainer: {
			flex: 1,
			justifyContent: 'center',
		},

		pressableIconContainer: {
			width: 48,
			height: 48,
			overflow: 'hidden',
			borderRadius: 24,
		},

		pressableIcon: {
			justifyContent: 'center',
			alignItems: 'center',
			flex: 1,
		},
	});
}

export default ListItemChat;
