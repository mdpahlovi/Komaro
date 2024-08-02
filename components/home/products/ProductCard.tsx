import { useTheme } from '@react-navigation/native';
import { Bag, Heart } from 'components/icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Pressable, View, Text, ImageBackground } from 'react-native';
import type { Product } from 'types';

export default function ProductCard({ id, title, thumbnail, price }: Product) {
    const { colors } = useTheme();
    const { navigate } = useRouter();

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Pressable
                onPress={() => navigate(`/details/${id}`)}
                style={{ flex: 1, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.border }}>
                <ImageBackground src={thumbnail} style={{ aspectRatio: 4 / 5, backgroundColor: colors.card }}>
                    <CardBody price={price} />
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

function CardBody({ price }: { price: number }) {
    const { colors } = useTheme();

    return (
        <BlurView intensity={50} style={{ marginTop: 'auto', margin: 6, borderRadius: 17, overflow: 'hidden' }}>
            <LinearGradient
                end={{ x: 1, y: 1 }}
                start={{ x: 0, y: 1 }}
                colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)']}
                style={{ padding: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Roboto-Medium', color: colors.text, paddingLeft: 10 }}>${price}</Text>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    {[<Heart transform={[{ scale: 0.75 }]} />, <Bag transform={[{ scale: 0.75 }]} />].map((icon, idx) => (
                        <Pressable
                            key={idx}
                            style={[
                                { width: 28, height: 28, borderRadius: 14, backgroundColor: 'white' },
                                { justifyContent: 'center', alignItems: 'center' },
                            ]}>
                            {icon}
                        </Pressable>
                    ))}
                </View>
            </LinearGradient>
        </BlurView>
    );
}
