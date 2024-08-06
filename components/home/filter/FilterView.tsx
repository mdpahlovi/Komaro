import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Text, ActionButton, RangeSlider, Input } from 'components/ui';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MIN_PRICE = 10;
const MAX_PRICE = 500;

export default function FilterView() {
    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
    const { bottom } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <BottomSheetScrollView>
                <View style={{ paddingHorizontal: 16, gap: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="heading">Filters</Text>
                        <Pressable>
                            <Text variant="action-link">See All</Text>
                        </Pressable>
                    </View>

                    {/* Range Selector */}
                    <View style={{ gap: 6 }}>
                        <Text variant="title">Price Range</Text>
                        <View style={{ marginTop: 4, gap: 28 }}>
                            <RangeSlider
                                min={MIN_PRICE}
                                max={MAX_PRICE}
                                step={1}
                                onValueChange={({ min, max }) => {
                                    setMinPrice(min);
                                    setMaxPrice(max);
                                }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ gap: 4 }}>
                                    <Text variant="action">Min Price</Text>
                                    <Input size="small" keyboardType="numeric" value={minPrice.toString()} style={{ width: 96 }} />
                                </View>
                                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                                    <Text variant="action">Max Price</Text>
                                    <Input
                                        size="small"
                                        keyboardType="numeric"
                                        value={maxPrice.toString()}
                                        style={{ width: 96, textAlign: 'right' }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Sports Category Filter */}
                    <View style={{ gap: 6 }}>
                        <Text variant="title">Sports</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                            {new Array(7).fill('').map((_, i) => (
                                <Button key={i} variant={i === 0 ? 'primary' : 'default'} size="small">
                                    Items [{i}]
                                </Button>
                            ))}
                        </View>
                    </View>
                    {/* Color Filter */}
                    <View style={{ gap: 6 }}>
                        <Text variant="title">Color</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                            {[
                                { color: '#D93F3E', label: 'Red', itemCount: 4 },
                                { color: '#FFFFFF', label: 'White', itemCount: 2 },
                                { color: '#58AB51', label: 'Green', itemCount: 6 },
                                { color: '#FB8C1D', label: 'Orange', itemCount: 10 },
                                { color: '#D3B38D', label: 'Tan', itemCount: 10 },
                                { color: '#FDE737', label: 'Yellow', itemCount: 10 },
                            ].map(({ color, label, itemCount }, i) => (
                                <View key={i} style={{ position: 'relative', justifyContent: 'center' }}>
                                    <Button variant={i === 0 ? 'primary' : 'default'} size="small">
                                        {'     ' + label} [{itemCount}]
                                    </Button>
                                    <ColorDot backgroundColor={color} />
                                </View>
                            ))}
                        </View>
                    </View>
                    {/* Sleeves Filter */}
                    <View style={{ gap: 6 }}>
                        <Text variant="title">Sleeves</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                            {[
                                { id: 'sortsleeve', label: 'Sort Sleeve', itemCount: 20 },
                                { id: 'longsleeve', label: 'Long Sleeve', itemCount: 100 },
                                { id: 'sleeveless', label: 'Sleeve Less', itemCount: 60 },
                            ].map(({ itemCount, label }, i) => (
                                <Button key={i} variant={i === 0 ? 'primary' : 'default'} size="small">
                                    {label} [{itemCount}]
                                </Button>
                            ))}
                        </View>
                    </View>
                </View>
            </BottomSheetScrollView>
            {/* Button */}

            <View style={{ padding: 16, paddingBottom: 16 + bottom }}>
                <ActionButton>Apply filters</ActionButton>
            </View>
        </View>
    );
}

function ColorDot({ backgroundColor }: { backgroundColor: string }) {
    return <View style={{ position: 'absolute', left: 12, backgroundColor, width: 16, height: 16, borderRadius: 9999 }} />;
}
