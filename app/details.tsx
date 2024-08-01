import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { Counter, Button, ActionButton, Text } from 'components/ui';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function DetailsScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(SIZES[0]);

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
                }}
                style={{ flex: 1 }}
            />

            <SafeAreaView
                edges={['top']}
                style={[
                    { position: 'absolute', top: 0, left: 0, right: 0 },
                    { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 8 },
                ]}>
                <Button variant="outlined" iconButton onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </Button>
                <View style={{ flex: 1 }} />
                <Button variant="outlined" iconButton>
                    <MaterialIcons name="favorite-border" size={24} color="#fff" />
                </Button>
                <Button variant="outlined" iconButton>
                    <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
                </Button>
            </SafeAreaView>

            <BottomSheet
                detached
                snapPoints={[132, 432]}
                backgroundStyle={{ borderBottomStartRadius: 0, borderBottomEndRadius: 0, backgroundColor: colors.background }}
                handleIndicatorStyle={{ backgroundColor: colors.primary }}>
                <View style={{ paddingHorizontal: 20, gap: 16 }}>
                    <Text variant="heading">PUMA Everyday Hussle</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', gap: 2 }}>
                                {new Array(5).fill('').map((_, i) => (
                                    <MaterialIcons key={i} name={i < 3 ? 'star' : 'star-border'} color="#facc15" size={20} />
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
                        <Text numberOfLines={3} variant="body">
                            Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt.
                            Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <View style={{ flex: 1 }}>
                            <Text variant="body-sm">Total</Text>
                            <Text variant="title">${(25000).toLocaleString()}</Text>
                        </View>

                        <ActionButton icon="arrow-forward">Add to Cart</ActionButton>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
