import { View, Text, StyleSheet } from 'react-native';
import React, { forwardRef, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';

// custom imports
import Colors from '@/constants/Colors';
import { ColorSchemeContext } from '@/context/ColorSchemeContext';

type Props = {
	children?: ReactNode;
};

type Ref = BottomSheet;

const BottomSheetComponent = forwardRef<Ref, Props>((props, ref) => {
	// Load the font
	const [fontsLoaded] = useFonts({
		AzeretMono: require('@/assets/fonts/AzeretMono-Variable.ttf'),
		Bespoke: require('@/assets/fonts/BespokeSans-Variable.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
	});
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme);

	// bottom sheet config
	const snapPoints = useMemo(() => ['50%', '90%'], []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			></BottomSheetBackdrop>
		),
		[]
	);
	return (
		<BottomSheet
			ref={ref}
			snapPoints={snapPoints}
			backgroundStyle={{
				backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			}}
			enablePanDownToClose={true}
			backdropComponent={renderBackdrop}
		>
			<BottomSheetView style={styles.container}>
				<Text>Awesome 🎉</Text>
			</BottomSheetView>
		</BottomSheet>
	);
});

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme) {
	return StyleSheet.create({
		satoshi: {
			fontFamily: 'Satoshi',
			fontSize: 30,
			color: Colors.light.secondary,
		},
		container: {
			flex: 1,
			backgroundColor: colorScheme === 'light' ? Colors.light.primary : Colors.firstGray,
			padding: 36,
			alignItems: 'center',
		},
	});
}

export default BottomSheetComponent;
