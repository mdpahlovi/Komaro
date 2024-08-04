import { useTheme } from '@react-navigation/native';
import { Bag, Heart } from 'components/icons';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';
import { useCartState } from 'hooks/useCartState';
import { useLovedProductsState } from 'hooks/useLovedProductState';
import { Pressable, View, Text, ImageBackground, PressableProps } from 'react-native';
import type { Product } from 'types';

const getPrice = (price: number, discount: number) =>
    (price * ((100 - discount) / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function ProductCard({ id, title, thumbnail, price, discountPercentage: discount }: Product) {
    const { colors } = useTheme();
    const { navigate } = useRouter();
    const { addToCart } = useCartState();
    const { addToLovedProducts } = useLovedProductsState();

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Pressable
                onPress={() => navigate(`/details/${id}`)}
                style={{ borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.border }}>
                <ImageBackground
                    src={thumbnail}
                    style={{ aspectRatio: 4 / 5, backgroundColor: colors.card }}
                    imageStyle={{ transform: [{ scale: 0.8 }] }}>
                    <BlurView
                        intensity={20}
                        style={[
                            { marginTop: 'auto', margin: 6, borderRadius: 17, overflow: 'hidden' },
                            { padding: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                        ]}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: colors.text, paddingLeft: 8 }}>{getPrice(price, discount)}</Text>
                        <View style={{ flexDirection: 'row', gap: 3 }}>
                            <IconButton
                                onPress={() => addToLovedProducts({ id, title, thumbnail, price: price * ((100 - discount) / 100) })}>
                                <Heart transform={[{ scale: 0.7 }]} />
                            </IconButton>
                            <IconButton
                                onPress={() => addToCart({ id, title, thumbnail, price: price * ((100 - discount) / 100), quantity: 1 })}>
                                <Bag transform={[{ scale: 0.7 }]} />
                            </IconButton>
                        </View>
                    </BlurView>
                </ImageBackground>
            </Pressable>

            <Link
                href={`/details/${id}`}
                numberOfLines={1}
                style={{ paddingHorizontal: 3, fontFamily: 'Roboto-Medium', color: colors.text }}>
                {title}
            </Link>
        </View>
    );
}

function IconButton(props: PressableProps) {
    return (
        <Pressable
            style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}
            {...props}
        />
    );
}
