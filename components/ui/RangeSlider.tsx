import { useColors } from 'hooks/useColors';
import { useState } from 'react';
import { View } from 'react-native';
import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';
import type { ComposedGesture, GestureType } from 'react-native-gesture-handler';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, type AnimatedStyle } from 'react-native-reanimated';

import Text from './Text';

type RangeSliderProps = {
    min: number;
    max: number;
    step: number;
    onValueChange: ({ min, max }: { min: number; max: number }) => void;
};

export default function RangeSlider({ min, max, step, onValueChange }: RangeSliderProps) {
    const [layout, setLayout] = useState<LayoutRectangle>();
    const sliderWidth = layout?.width ? layout?.width : 300;

    const { card, border: borderColor, primary } = useColors();
    const position = useSharedValue(0);
    const position2 = useSharedValue(sliderWidth);
    const zIndex = useSharedValue(0);
    const zIndex2 = useSharedValue(0);
    const context = useSharedValue(0);
    const context2 = useSharedValue(0);

    // Using new Gesture API
    const pan = Gesture.Pan()
        .onBegin(() => {
            context.value = position.value;
        })
        .onUpdate((e) => {
            if (context.value + e.translationX < 0) {
                position.value = 0;
            } else if (context.value + e.translationX > position2.value) {
                position.value = position2.value;
                zIndex.value = 1;
                zIndex2.value = 0;
            } else {
                position.value = context.value + e.translationX;
            }
        })
        .onEnd(() => {
            runOnJS(onValueChange)({
                min: min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step,
                max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
            });
        });

    const pan2 = Gesture.Pan()
        .onBegin(() => {
            context2.value = position2.value;
        })
        .onUpdate((e) => {
            if (context2.value + e.translationX > sliderWidth) {
                position2.value = sliderWidth;
            } else if (context2.value + e.translationX < position.value) {
                position2.value = position.value;
                zIndex.value = 0;
                zIndex2.value = 1;
            } else {
                position2.value = context2.value + e.translationX;
            }
        })
        .onEnd(() => {
            runOnJS(onValueChange)({
                min: min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step,
                max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
            });
        });

    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: position.value }], zIndex: zIndex.value }));
    const animatedStyle2 = useAnimatedStyle(() => ({ transform: [{ translateX: position2.value }], zIndex: zIndex2.value }));

    const sliderStyle = useAnimatedStyle(() => ({ transform: [{ translateX: position.value }], width: position2.value - position.value }));

    return (
        <View style={[{ flex: 1, justifyContent: 'center' }]}>
            <View
                onLayout={(e) => setLayout(e.nativeEvent.layout)}
                style={[{ height: 16, backgroundColor: card, borderRadius: 8, borderWidth: 1, borderColor }]}
            />
            <Animated.View style={[sliderStyle, { height: 16, backgroundColor: primary, borderRadius: 8, position: 'absolute' }]} />
            <SliderHandle
                gesture={pan}
                style={animatedStyle}
                value={min + Math.floor(position.value / (sliderWidth / ((max - min) / step))) * step}
            />
            <SliderHandle
                gesture={pan2}
                style={animatedStyle2}
                value={min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step}
            />
        </View>
    );
}

type SliderHandleProps = { gesture: ComposedGesture | GestureType; style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>; value: number };

function SliderHandle({ gesture, style, value }: SliderHandleProps) {
    const { primary } = useColors();

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    { left: -12, width: 24, height: 24, position: 'absolute', backgroundColor: 'white' },
                    { borderColor: primary, borderWidth: 4, borderRadius: 12 },
                    style,
                ]}>
                <View style={{ position: 'absolute', top: 24, left: -24, width: 64 }}>
                    <Text variant="action" style={{ textAlign: 'center' }}>
                        {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
}
