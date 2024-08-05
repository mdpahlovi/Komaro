import { Bag, Heart } from 'components/icons';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useColors } from 'hooks/useColors';
import { useLovedProductsState } from 'hooks/useLovedProductState';
import { Pressable, View, Text, ImageBackground, PressableProps } from 'react-native';
import type { Product } from 'types';

const getPrice = (price: number, discount: number) =>
    (price * ((100 - discount) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function ProductCard({ id, title, thumbnail, price, discountPercentage: discount, stock }: Product) {
    const { border, card, text } = useColors();
    const { navigate } = useRouter();
    const { items, addToCart } = useCartState();
    const { lovedProducts, addToLovedProducts } = useLovedProductsState();

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Pressable
                onPress={() => navigate(`/details/${id}`)}
                style={{ borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: border }}>
                <ImageBackground
                    src={thumbnail}
                    style={{ aspectRatio: 4 / 5, backgroundColor: card }}
                    imageStyle={{ transform: [{ scale: 0.8 }] }}>
                    <BlurView
                        intensity={20}
                        style={[
                            { marginTop: 'auto', margin: 6, borderRadius: 17, overflow: 'hidden' },
                            { padding: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                        ]}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: text, paddingLeft: 8 }}>{getPrice(price, discount)}</Text>
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <IconButton
                                onPress={() => addToLovedProducts({ id, title, thumbnail, price: price * ((100 - discount) / 100) })}
                                disabled={!!lovedProducts.find((lovedProduct) => lovedProduct?.id === id)}>
                                <Heart transform={[{ scale: 0.7 }]} />
                            </IconButton>
                            <IconButton
                                onPress={() =>
                                    addToCart({ id, title, thumbnail, price: price * ((100 - discount) / 100), quantity: 1, stock })
                                }
                                disabled={!!items.find((item) => item?.id === id)}>
                                <Bag transform={[{ scale: 0.7 }]} />
                            </IconButton>
                        </View>
                    </BlurView>
                </ImageBackground>
            </Pressable>

            <Link href={`/details/${id}`} numberOfLines={1} style={{ paddingHorizontal: 3, fontFamily: 'Roboto-Medium', color: text }}>
                {title}
            </Link>
        </View>
    );
}

function IconButton({ disabled, ...props }: PressableProps) {
    return (
        <Pressable
            style={[
                { width: 26, height: 26, borderRadius: 13, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
                disabled ? { opacity: 0.3, pointerEvents: 'none' } : null,
            ]}
            {...props}
        />
    );
}
