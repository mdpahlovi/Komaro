import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, ActionButton, Counter } from 'components/ui';
import { useRouter } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useColors } from 'hooks/useColors';
import { useEffect } from 'react';
import { View, ScrollView, Image, PressableProps, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function CheckoutScreen() {
    const { card, primary, text, border } = useColors();

    const { navigate } = useRouter();
    const { items, removeFromCart, updateQuantity } = useCartState();
    const total = items.map(({ price, quantity }) => price * quantity).reduce((accumulator, value) => accumulator + value, 0);
    const shippingTax = total * (5 / 100);

    useEffect(() => {
        if (!items?.length) navigate('/home');
    }, [items]);

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
            <View style={{ gap: 8 }}>
                <Text variant="heading">My Cart</Text>
                {items?.map(({ id, title, thumbnail, price, quantity, stock }) => (
                    <Swipeable key={id} renderRightActions={() => <RightAction />} onSwipeableOpen={() => removeFromCart(id)}>
                        <View
                            style={[
                                { flex: 1, backgroundColor: card, flexDirection: 'row', gap: 6 },
                                { borderWidth: 1, borderColor: border, borderRadius: 20 },
                            ]}>
                            <Image src={thumbnail} style={{ width: 104, height: 104 }} />
                            <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 6 }}>
                                <Text variant="title-lg">{title}</Text>
                                <Text variant="heading">
                                    {(price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </Text>
                            </View>
                            <Counter
                                value={quantity}
                                onChange={(value) => updateQuantity(id, value)}
                                maxValue={stock}
                                style={{ flexDirection: 'column-reverse', paddingLeft: 0, backgroundColor: 'transparent' }}
                            />
                        </View>
                    </Swipeable>
                ))}
            </View>
            <View style={{ gap: 6 }}>
                <Text variant="heading">Delivery Location</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <IconButton>
                            <MaterialCommunityIcons name="truck-delivery-outline" style={{ fontSize: 18, color: primary }} />
                        </IconButton>
                        <View>
                            <Text>2 Petre Melikishvili St.</Text>
                            <Text variant="body-sm">0162, Tbilisi</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" style={{ fontSize: 20, color: text }} />
                </View>
            </View>
            <View style={{ gap: 6 }}>
                <Text variant="heading">Payment Method</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <IconButton>
                            <Text variant="action-link">VISA</Text>
                        </IconButton>
                        <View>
                            <Text>Visa Classic</Text>
                            <Text variant="body-sm">****-9092</Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" style={{ fontSize: 20, color: text }} />
                </View>
            </View>
            <View style={{ gap: 6 }}>
                <Text variant="heading">Order Info</Text>
                <View style={{ gap: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="body-sm">Subtotal</Text>
                        <Text style={{ fontSize: 12 }}>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="body-sm">Shipping Tax</Text>
                        <Text style={{ fontSize: 12 }}>{shippingTax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant="body-sm">Total</Text>
                    <Text variant="heading">{(total + shippingTax).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                </View>
            </View>
            <ActionButton>Checkout ({(total + shippingTax).toLocaleString('en-US', { style: 'currency', currency: 'USD' })})</ActionButton>
        </ScrollView>
    );
}

function RightAction() {
    const { notification: backgroundColor } = useColors();
    return (
        <View style={{ marginLeft: 16, justifyContent: 'center', backgroundColor, borderRadius: 20, paddingHorizontal: 24 }}>
            <Text style={{ fontFamily: 'Roboto-Medium', color: '#FFFFFF' }}>Delete</Text>
        </View>
    );
}

function IconButton(props: PressableProps) {
    const { card, border } = useColors();

    return (
        <Pressable
            style={[
                { width: 48, height: 40, justifyContent: 'center', alignItems: 'center' },
                { backgroundColor: card, borderWidth: 1, borderColor: border, borderRadius: 12 },
            ]}
            {...props}
        />
    );
}
