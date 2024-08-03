import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Bag, Heart } from 'components/icons';
import { StarFilled } from 'components/icons/filled';
import { Counter, Button, ActionButton, Text } from 'components/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Image, type LayoutRectangle, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from 'types';
import { axios } from 'utilities/axios';

export default function DetailsScreen() {
    const { back } = useRouter();
    const { colors } = useTheme();
    const { id } = useLocalSearchParams();
    const [layout, setLayout] = useState<LayoutRectangle>();

    const [count, setCount] = useState(1);

    const { data } = useQuery<Product>({
        queryKey: ['product', { id }],
        queryFn: async () => await axios.get(`/products/${id}`).then((res) => res.data),
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {data ? (
                <Image src={data?.thumbnail} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
            ) : (
                <View>
                    <ActivityIndicator size={120} color={colors.primary} />
                </View>
            )}

            <SafeAreaView edges={['top']} style={[{ position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', gap: 8 }]}>
                <Button iconButton onPress={back}>
                    <ArrowLeft color={colors.text} />
                </Button>
                <View style={{ flex: 1 }} />
                <Button iconButton>
                    <Heart color={colors.text} />
                </Button>
                <Button iconButton>
                    <Bag color={colors.text} />
                </Button>
            </SafeAreaView>

            {data ? (
                <BottomSheet
                    detached
                    snapPoints={[128, (layout?.height || 0) + 44]}
                    backgroundStyle={{ borderBottomStartRadius: 0, borderBottomEndRadius: 0, backgroundColor: colors.card }}
                    handleIndicatorStyle={{ backgroundColor: colors.primary }}>
                    <View onLayout={(e) => setLayout(e.nativeEvent.layout)} style={{ paddingHorizontal: 16, gap: 16 }}>
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
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map((s, i) => (
                                    <Button key={i} variant={i === 0 ? 'primary' : 'default'} iconButton textStyle={{ fontSize: 12 }}>
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
            ) : null}
        </View>
    );
}
