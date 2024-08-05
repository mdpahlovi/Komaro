import BottomSheet from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { Bag, Heart } from 'components/icons';
import { StarFilled } from 'components/icons/filled';
import { Counter, Button, ActionButton, Text, BackButton } from 'components/ui';
import { useLocalSearchParams } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useColors } from 'hooks/useColors';
import { useLovedProductsState } from 'hooks/useLovedProductState';
import { useProductState } from 'hooks/useProductState';
import { useState } from 'react';
import { View, Image, type LayoutRectangle, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Product } from 'types';
import { axios } from 'utilities/axios';

const getPrice = (price: number, discount: number, count: number) =>
    (price * count * ((100 - discount) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function DetailsScreen() {
    const { primary, text, card, notification } = useColors();
    const { id } = useLocalSearchParams();
    const [layout, setLayout] = useState<LayoutRectangle>();
    const { count, setCount } = useProductState();
    const { addToCart } = useCartState();
    const { addToLovedProducts } = useLovedProductsState();

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
                    <ActivityIndicator size={120} color={primary} />
                </View>
            )}

            <SafeAreaView edges={['top']} style={[{ position: 'absolute', top: 16, left: 16, right: 16, flexDirection: 'row', gap: 8 }]}>
                <BackButton />
                <View style={{ flex: 1 }} />
                <Button
                    onPress={() => {
                        if (!data) return;
                        const { id, title, thumbnail, price, discountPercentage: discount } = data;

                        addToLovedProducts({ id, title, thumbnail, price: price * ((100 - discount) / 100) });
                    }}
                    iconButton>
                    <Heart color={text} />
                </Button>
                <Button
                    onPress={() => {
                        if (!data) return;
                        const { id, title, thumbnail, price, discountPercentage: discount, stock } = data;

                        addToCart({ id, title, thumbnail, price: price * ((100 - discount) / 100), quantity: count, stock });
                    }}
                    iconButton>
                    <Bag color={text} />
                </Button>
            </SafeAreaView>

            {data ? (
                <BottomSheet
                    detached
                    snapPoints={[124, (layout?.height || 0) + 44]}
                    backgroundStyle={{ borderBottomStartRadius: 0, borderBottomEndRadius: 0, backgroundColor: card }}
                    handleIndicatorStyle={{ backgroundColor: primary }}>
                    <View onLayout={(e) => setLayout(e.nativeEvent.layout)} style={{ paddingHorizontal: 16, gap: 16 }}>
                        <Text variant="heading">{data?.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                            <View>
                                <View style={{ flexDirection: 'row', gap: 4 }}>
                                    {new Array(5).fill('').map((_, i) => (
                                        <StarFilled key={i} color="#facc15" size={16} />
                                    ))}
                                </View>
                                <Text variant="body-sm">
                                    {data?.rating} ({(data?.reviews?.length).toString().padStart(2, '0')} Reviews)
                                </Text>
                            </View>
                            <Counter value={count} onChange={setCount} maxValue={data?.stock} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text
                                variant="title"
                                style={[
                                    { paddingHorizontal: 10, paddingVertical: 4, lineHeight: 18, borderRadius: 9999 },
                                    { backgroundColor: data?.availabilityStatus === 'In Stock' ? 'green' : notification },
                                ]}>
                                {(data?.stock).toString().padStart(2, '0')} - {data?.availabilityStatus}
                            </Text>
                            <View style={{ flex: 1 }} />
                        </View>
                        <View>
                            <Text variant="title">Description</Text>
                            <Text variant="body">{data?.description}</Text>
                            <Text>→ {data?.warrantyInformation}</Text>
                            <Text>
                                → {data?.shippingInformation} - {data?.returnPolicy}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                            <View style={{ flex: 1 }}>
                                <Text variant="body-sm">Total</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Text variant="title">{getPrice(data?.price, data?.discountPercentage, count)}</Text>
                                    <Text
                                        variant="title"
                                        style={[
                                            { marginTop: 2, paddingHorizontal: 4, fontSize: 10, lineHeight: 12 },
                                            { backgroundColor: notification, borderRadius: 8 },
                                        ]}>
                                        {-data?.discountPercentage}%
                                    </Text>
                                </View>
                            </View>

                            <ActionButton>Proceed Pay</ActionButton>
                        </View>
                    </View>
                </BottomSheet>
            ) : null}
        </View>
    );
}
