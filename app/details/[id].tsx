import { useQuery } from '@tanstack/react-query';
import { Bag, Heart } from 'components/icons';
import { StarFilled } from 'components/icons/filled';
import { ActionButton, BackButton, Button, Counter, Text } from 'components/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useColors } from 'hooks/useColors';
import { useLovedProductsState } from 'hooks/useLovedProductState';
import { useProductState } from 'hooks/useProductState';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Product } from 'types';
import { axios } from 'utilities/axios';

const { width } = Dimensions.get('window');

const getPrice = (price: number, discount: number, count: number) =>
    (price * count * ((100 - discount) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function DetailsScreen() {
    const { primary, text, textLight, card, background } = useColors();
    const { navigate } = useRouter();
    const { id } = useLocalSearchParams();
    const { count, setCount } = useProductState();
    const { items, addToCart } = useCartState();
    const { lovedProducts, addToLovedProducts } = useLovedProductsState();

    const { data } = useQuery<Product>({
        queryKey: ['product', { id }],
        queryFn: async () => await axios.get(`/products/${id}`).then((res) => res.data),
    });

    const styles = StyleSheet.create({
        actionsContainer: {
            position: 'absolute',
            top: 8,
            left: 16,
            right: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        contentContainer: {
            flex: 1,
            backgroundColor: card,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16,
        },
    });

    if (!data) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: background,
                }}>
                <ActivityIndicator size="large" color={primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
            <View style={{ width: width, height: width, position: 'relative' }}>
                <Image source={{ uri: data.thumbnail }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />

                <View style={styles.actionsContainer}>
                    <BackButton />
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Button
                            onPress={() => {
                                const { id, title, thumbnail, price, discountPercentage: discount } = data;
                                addToLovedProducts({ id, title, thumbnail, price: price * ((100 - discount) / 100) });
                            }}
                            iconButton>
                            <Heart color={lovedProducts.find(({ id }) => id === data.id) ? '#EF4444' : '#FFFFFF'} />
                        </Button>
                        <Button
                            onPress={() => {
                                const { id, title, thumbnail, price, discountPercentage: discount, stock } = data;
                                addToCart({ id, title, thumbnail, price: price * ((100 - discount) / 100), quantity: count, stock });
                            }}
                            iconButton>
                            <Bag color={items.find(({ id }) => id === data.id) ? primary : '#FFFFFF'} />
                        </Button>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: text }}>{data.title}</Text>

                <View style={{ marginTop: 8, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        {new Array(5).fill('').map((_, i) => (
                            <StarFilled key={i} color="#FBBF24" size={18} />
                        ))}
                    </View>
                    <Text style={{ fontSize: 14, color: textLight }}>
                        {data.rating} ({data.reviews?.length.toString().padStart(2, '0')} Reviews)
                    </Text>
                </View>

                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* Status Section */}
                    <View
                        style={[
                            { height: 36, paddingInline: 12, justifyContent: 'center', borderRadius: 18 },
                            {
                                backgroundColor:
                                    data.availabilityStatus === 'In Stock' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            },
                        ]}>
                        <Text
                            style={[
                                { fontFamily: 'Roboto-Medium' },
                                {
                                    color: data.availabilityStatus === 'In Stock' ? '#22C55E' : '#EF4444',
                                },
                            ]}>
                            {data.stock.toString().padStart(2, '0')} - {data.availabilityStatus}
                        </Text>
                    </View>
                    <Counter value={count} onChange={setCount} maxValue={data.stock} />
                </View>

                {/* Description */}
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: text, marginBottom: 4 }}>Description</Text>
                    <Text style={{ fontSize: 14, color: textLight, marginBottom: 2 }}>{data.description}</Text>
                    <Text style={{ fontSize: 14, color: textLight }}>• {data.warrantyInformation}</Text>
                    <Text style={{ fontSize: 14, color: textLight }}>
                        • {data.shippingInformation} - {data.returnPolicy}
                    </Text>
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: text, marginBottom: 2 }}>Total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 24, fontFamily: 'Roboto-Bold', color: text }}>
                            {getPrice(data.price, data.discountPercentage, count)}
                        </Text>
                        <View style={{ height: 20, paddingInline: 6, backgroundColor: 'red', borderRadius: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>-{data.discountPercentage}%</Text>
                        </View>
                    </View>
                </View>

                <ActionButton
                    onPress={() => {
                        const { id, title, thumbnail, price, discountPercentage: discount, stock } = data;
                        addToCart({ id, title, thumbnail, price: price * ((100 - discount) / 100), quantity: count, stock });
                        navigate('/checkout');
                    }}
                    style={{ width: '100%' }}>
                    Proceed To Pay
                </ActionButton>
                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
