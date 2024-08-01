import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { Image, StyleSheet, Pressable, View, Text, ViewStyle } from 'react-native';

type ProductCardProps = {
    type?: 'default' | 'new';
    name?: string;
    price: number;
    image: string;
    style?: ViewStyle;
};

export default function ProductCard({ type = 'default', name, price, image, style }: ProductCardProps) {
    const navigation = useNavigation();

    return (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('details')}
            style={[{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 10 }, style]}>
            <Image source={{ uri: image }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }} />

            <CardBody type={type} name={name} price={price} />
        </Pressable>
    );
}

function CardBody({ type, name, price }: { type: 'default' | 'new'; name?: string; price: number }) {
    if (type === 'new') {
        return (
            <BlurView intensity={20} style={{ position: 'absolute', left: 12, top: 12, borderRadius: 8, overflow: 'hidden' }}>
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
            <View style={[StyleSheet.absoluteFill, { padding: 12 }]}>
                <View style={{ position: 'absolute', top: 6, right: 6, padding: 8, borderRadius: 10, backgroundColor: 'black' }}>
                    <MaterialIcons name="favorite-border" size={20} color="white" />
                </View>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: 'black', paddingLeft: 6 }}>{name}</Text>
                <View style={{ flex: 1 }} />
                <BlurView style={{ overflow: 'hidden' }} intensity={20} />
                <BlurView intensity={20} style={{ borderRadius: 100, overflow: 'hidden' }}>
                    <LinearGradient
                        end={{ x: 1, y: 1 }}
                        start={{ x: 0, y: 1 }}
                        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)']}
                        style={{ padding: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Roboto-Medium', color: 'black', paddingLeft: 10 }}>${price}</Text>
                        <Pressable style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, backgroundColor: 'white' }}>
                            <MaterialIcons name="add-shopping-cart" size={18} color="black" />
                        </Pressable>
                    </LinearGradient>
                </BlurView>
            </View>
        );
    }
}
