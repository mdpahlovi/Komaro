import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bag, Heart } from 'components/icons';
import { StarFilled } from 'components/icons/filled';
import { Counter, Button, ActionButton, Text } from 'components/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from 'types';
import { axios } from 'utilities/axios';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function DetailsScreen() {
    const { back } = useRouter();
    const { colors } = useTheme();
    const { id } = useLocalSearchParams();
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(SIZES[0]);

    const { data } = useQuery<Product>({
        queryKey: ['product', { id }],
        queryFn: async () => await axios.get(`/products/${id}`).then((res) => res.data),
    });

    if (!data)
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
            <Image src={data?.thumbnail} style={{ aspectRatio: 3 / 4 }} />

            <SafeAreaView
                edges={['top']}
                style={[
                    { position: 'absolute', top: 0, left: 0, right: 0 },
                    { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
                ]}>
                <Button variant="outlined" iconButton onPress={back}>
                    <ArrowLeft color="#fff" />
                </Button>
                <View style={{ flex: 1 }} />
                <Button variant="outlined" iconButton>
                    <Heart color="#fff" />
                </Button>
                <Button variant="outlined" iconButton>
                    <Bag color="#fff" />
                </Button>
            </SafeAreaView>

            <BottomSheet
                detached
                snapPoints={[128, 426]}
                backgroundStyle={{ borderBottomStartRadius: 0, borderBottomEndRadius: 0, backgroundColor: colors.background }}
                handleIndicatorStyle={{ backgroundColor: colors.primary }}>
                <View style={{ paddingHorizontal: 16, gap: 16 }}>
                    <Text variant="heading">{data?.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 1 }}>
                                {new Array(5).fill('').map((_, i) => (
                                    <StarFilled key={i} color="#facc15" transform={[{ scale: 0.8 }]} />
                                ))}
                            </View>
                            <Text variant="body-sm">3.0 (250K Reviews)</Text>
                        </View>
                        <Counter value={count} onChange={setCount} />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Text variant="title">Model is 6'1'', Size M</Text>
                            <Text variant="action">Size Guide</Text>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                            {SIZES.map((s, i) => (
                                <Button
                                    key={i}
                                    variant={s === size ? 'primary' : 'default'}
                                    iconButton
                                    textStyle={{ fontSize: 12 }}
                                    onPress={() => setSize(s)}>
                                    {s}
                                </Button>
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text variant="title">Description</Text>
                        <Text variant="body">{data?.description}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text variant="body-sm">Total</Text>
                            <Text variant="title">${(data?.price).toLocaleString()}</Text>
                        </View>

                        <ActionButton icon="arrow-forward">Add to Cart</ActionButton>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
