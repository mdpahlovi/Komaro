import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Text } from 'components/ui';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PriceRangeSelector from './PriceRangeSelector';
import ActionButton from '../ui/ActionButton';

const MAX_PRICE = 500;

const COLORS = [
    { color: '#D93F3E', label: 'Red', itemCount: 4 },
    { color: '#FFFFFF', label: 'White', itemCount: 2 },
    { color: '#58AB51', label: 'Green', itemCount: 6 },
    { color: '#FB8C1D', label: 'Orange', itemCount: 10 },
    { color: '#D3B38D', label: 'Tan', itemCount: 10 },
    { color: '#FDE737', label: 'Yellow', itemCount: 10 },
];

const SLEEVES = [
    { id: 'sortsleeve', label: 'Sort Sleeve', itemCount: 20 },
    { id: 'longsleeve', label: 'Long Sleeve', itemCount: 100 },
    { id: 'sleeveless', label: 'Sleeve Less', itemCount: 60 },
];

export default function FilterView() {
    const [startPrice, setStartPrice] = useState(50);
    const [endPrice, setEndPrice] = useState(250);
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

                    <PriceRangeSelector
                        minPrice={0}
                        maxPrice={MAX_PRICE}
                        startPrice={startPrice}
                        endPrice={endPrice}
                        onStartPriceChange={setStartPrice}
                        onEndPriceChange={setEndPrice}
                    />

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
                            {COLORS.map(({ color, label, itemCount }, i) => (
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
                            {SLEEVES.map(({ itemCount, label }, i) => (
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
                <ActionButton icon="arrow-forward">Apply filters</ActionButton>
            </View>
        </View>
    );
}

function ColorDot({ backgroundColor }: { backgroundColor: string }) {
    return <View style={{ position: 'absolute', left: 12, backgroundColor, width: 16, height: 16, borderRadius: 9999 }} />;
}
