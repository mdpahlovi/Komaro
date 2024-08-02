import { useTheme } from '@react-navigation/native';
import { Text } from 'components/ui';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function PriceRangeSelector({
    minPrice,
    maxPrice,
    startPrice,
    endPrice,
    onStartPriceChange,
    onEndPriceChange,
}: {
    minPrice: number;
    maxPrice: number;
    startPrice: number;
    endPrice: number;
    onStartPriceChange: (value: number) => void;
    onEndPriceChange: (value: number) => void;
}) {
    const { colors } = useTheme();
    const [barWidth, setBarWidth] = useState(0);
    const leftHandlePos = useSharedValue(0);
    const rightHandlePos = useSharedValue(0);

    const startHandleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { prevPos: number }>({
        onStart(event, context) {
            context.prevPos = leftHandlePos.value;
        },
        onActive(event, context) {
            leftHandlePos.value = Math.min(rightHandlePos.value, Math.max(0, context.prevPos + event.translationX));

            runOnJS(onStartPriceChange)(Math.round((maxPrice / barWidth) * leftHandlePos.value));
        },
    });

    const rightHandleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { prevPos: number }>({
        onStart(event, context) {
            context.prevPos = rightHandlePos.value;
        },
        onActive(event, context) {
            rightHandlePos.value = Math.min(barWidth, Math.max(leftHandlePos.value, context.prevPos + event.translationX));
            runOnJS(onEndPriceChange)(Math.round((maxPrice / barWidth) * rightHandlePos.value));
        },
    });

    const leftHandleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: leftHandlePos.value }],
    }));

    const rightHandleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: rightHandlePos.value }],
    }));

    const barHighlightStyle = useAnimatedStyle(() => ({ left: leftHandlePos.value, right: barWidth - rightHandlePos.value }));

    const bars = useMemo(
        () => (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                {new Array(Math.round(maxPrice / 50)).fill('').map((_, i) => {
                    const randomValue = Math.random();

                    return (
                        <View
                            key={i}
                            style={{
                                flex: 1,
                                height: Math.round(randomValue * 40) + 8,
                                backgroundColor: colors.primary,
                                opacity: Math.max(0.2, Math.min(0.5, randomValue)),
                            }}
                        />
                    );
                })}
            </View>
        ),
        []
    );

    useEffect(() => {
        if (barWidth === 0) return;

        leftHandlePos.value = (startPrice * barWidth) / maxPrice;
        rightHandlePos.value = (endPrice * barWidth) / maxPrice;
    }, [barWidth]);

    return (
        <View>
            <View style={{ marginBottom: 12 }}>
                <Text variant="title">Price Range </Text>
            </View>
            {bars}
            <View
                style={{ height: 1, width: '100%', backgroundColor: colors.border, position: 'relative', marginBottom: 16 }}
                onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}>
                <Animated.View style={[barHighlightStyle, { position: 'absolute', height: '100%', backgroundColor: colors.primary }]} />

                <PanGestureHandler onGestureEvent={startHandleGesture}>
                    <Animated.View style={[leftHandleStyle, { position: 'absolute', zIndex: 10 }]}>
                        <View
                            style={{ backgroundColor: colors.card, width: 1000, position: 'absolute', right: 20, height: 48, bottom: 20 }}
                        />
                        <SliderHandle label={`$${startPrice}`} />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler onGestureEvent={rightHandleGesture}>
                    <Animated.View style={[rightHandleStyle, { position: 'absolute', zIndex: 10 }]}>
                        <View style={{ backgroundColor: colors.card, width: 1000, position: 'absolute', height: 48, bottom: 20 }} />
                        <SliderHandle label={`$${endPrice}`} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    );
}

function SliderHandle({ label }: { label: string }) {
    const { colors } = useTheme();

    return (
        <View
            style={{
                height: 20,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderColor: colors.primary,
                backgroundColor: colors.background,
                borderWidth: 2,
                position: 'relative',
                transform: [{ translateX: -10 }, { translateY: -10 }],
            }}>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary }} />
            <View style={{ position: 'absolute', top: 20, width: 200, alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>{label}</Text>
            </View>
        </View>
    );
}
