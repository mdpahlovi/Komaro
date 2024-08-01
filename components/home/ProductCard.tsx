import { Bag, Heart } from 'components/icons';
import { Text } from 'components/ui';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from 'expo-router';
import { Image, StyleSheet, Pressable, View, ViewStyle } from 'react-native';

type ProductCardProps = { type?: 'default' | 'new'; name?: string; price: number; image: string; style?: ViewStyle };

export default function ProductCard({ type = 'default', name, price, image, style }: ProductCardProps) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Pressable
                // @ts-ignore
                onPress={() => navigation.navigate('details')}
                style={[{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 10 }, style]}>
                <Image source={{ uri: image }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} />

                <CardBody type={type} price={price} />
            </Pressable>
            {type === 'default' ? (
                <Link href="/details" style={{ paddingHorizontal: 3 }}>
                    <Text style={{ fontFamily: 'Roboto-Medium' }}>{name}</Text>
                </Link>
            ) : null}
        </View>
    );
}

function CardBody({ type, price }: { type: 'default' | 'new'; price: number }) {
    if (type === 'new') {
        return (
            <BlurView intensity={20} style={{ position: 'absolute', left: 6, top: 6, borderRadius: 9999, overflow: 'hidden' }}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
                    <Text style={{ fontFamily: 'Roboto-Medium', color: 'black' }}>${price}</Text>
                </LinearGradient>
            </BlurView>
        );
    } else {
        return (
            <View style={[StyleSheet.absoluteFill, { padding: 6 }]}>
                <View style={{ flex: 1 }} />
                <BlurView style={{ overflow: 'hidden' }} intensity={20} />
                <BlurView intensity={20} style={{ borderRadius: 100, overflow: 'hidden' }}>
                    <LinearGradient
                        end={{ x: 1, y: 1 }}
                        start={{ x: 0, y: 1 }}
                        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)']}
                        style={{ padding: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: 'black', paddingLeft: 10 }}>${price}</Text>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            {[<Heart transform={[{ scale: 0.8 }]} />, <Bag transform={[{ scale: 0.8 }]} />].map((icon, idx) => (
                                <Pressable
                                    key={idx}
                                    style={[
                                        { width: 32, height: 32, borderRadius: 16, backgroundColor: 'white' },
                                        { justifyContent: 'center', alignItems: 'center' },
                                    ]}>
                                    {icon}
                                </Pressable>
                            ))}
                        </View>
                    </LinearGradient>
                </BlurView>
            </View>
        );
    }
}
