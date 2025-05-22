import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import React, {
	forwardRef,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { Dimensions, StyleSheet } from 'react-native';

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
	const width = Dimensions.get('window').width;
	const { colorScheme } = useContext(ColorSchemeContext);
	const styles = createStyles(colorScheme, width);

	// bottom sheet config
	const snapPoints = useMemo(() => ['55%', '90%'], []);

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
			index={-1}
			snapPoints={snapPoints}
			backgroundStyle={{
				backgroundColor:
					colorScheme === 'light'
						? Colors.light.primary
						: Colors.firstGray,
				borderRadius: 10,
			}}
			enablePanDownToClose={true}
			backdropComponent={renderBackdrop}
			handleIndicatorStyle={{
				backgroundColor:
					colorScheme === 'light'
						? Colors.light.secondary
						: Colors.dark.secondary,
				width: 64,
			}}
		>
			<BottomSheetView style={styles.container}>
				{props.children}
			</BottomSheetView>
		</BottomSheet>
	);
});

type ColorScheme = 'light' | 'dark' | undefined | null;

function createStyles(colorScheme: ColorScheme, width: number) {
	return StyleSheet.create({
		satoshi: {
			fontFamily: 'Satoshi',
			fontSize: 30,
			color: Colors.light.secondary,
		},
		container: {
			flex: 1,
			paddingHorizontal: width > 450 ? 16 : 4,
			paddingVertical: 16,
		},
	});
}

export default BottomSheetComponent;
