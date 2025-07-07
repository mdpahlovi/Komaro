import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function CustomBackdrop({ animatedIndex, style }: BottomSheetBackdropProps) {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: `rgba(0, 0, 0, ${interpolate(animatedIndex.value, [-1, 0], [0, 0.5], Extrapolate.CLAMP)})`,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style]);

    const blurViewProps = useAnimatedProps(() => ({ intensity: interpolate(animatedIndex.value, [-1, 0], [0, 20], Extrapolate.CLAMP) }));

    return <AnimatedBlurView animatedProps={blurViewProps} style={containerStyle} />;
}
