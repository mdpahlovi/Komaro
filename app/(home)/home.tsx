import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { CustomBackdrop, FilterView, ProductCard, products } from 'components/home';
import { Filter } from 'components/icons';
import { Button, Input, Text } from 'components/ui';
import { useCallback, useRef, useState } from 'react';
import { View, ScrollView, Image, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['Clothing', 'Shoes', 'Accessories', 'Accessories 2', 'Accessories 3', 'Accessories 4'];

export default function HomeScreen() {
    const { colors } = useTheme();
    const [categoryIndex, setCategoryIndex] = useState(0);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 16 + 28, gap: 16 }}>
                {/* Header Section */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3' }}
                        style={{ width: 44, height: 44, borderRadius: 22, aspectRatio: 1 }}
                        resizeMode="cover"
                    />
                    <View style={{ flex: 1 }}>
                        <Text variant="heading">Hi, James 👋</Text>
                        <Text numberOfLines={1} variant="body">
                            Discover fashion that suit your style
                        </Text>
                    </View>
                    <Button variant="outlined" iconButton>
                        <MaterialIcons name="notifications" size={24} color={colors.text} />
                    </Button>
                </View>
                {/* Search Bar Section */}
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Input placeholder="Search..." />
                    <Button variant="primary" onPress={openFilterModal} iconButton>
                        <Filter color={colors.text} />
                    </Button>
                </View>
                {/* Grid Collection View */}
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
                        <Text variant="heading">New Collections</Text>
                        <Pressable>
                            <Text variant="action-link">See All</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', height: 256, gap: 6 }}>
                        <ProductCard
                            type="new"
                            price={130}
                            image="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                        />
                        <View style={{ flex: 1, gap: 6 }}>
                            <ProductCard
                                type="new"
                                price={120}
                                image="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                            />
                            <ProductCard
                                type="new"
                                price={170}
                                image="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
                            />
                        </View>
                    </View>
                </View>
                {/* Categories Section */}
                <FlatList
                    horizontal
                    data={CATEGORIES}
                    style={{ maxHeight: 48 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 6, alignItems: 'center' }}
                    renderItem={({ item, index }) => (
                        <Button
                            variant={index === categoryIndex ? 'primary' : 'default'}
                            size="small"
                            onPress={() => setCategoryIndex(index)}>
                            {item}
                        </Button>
                    )}
                />
                {/* Products Section */}
                <View style={{ gap: 6 }}>
                    {Array.from({ length: Math.ceil(products.length / 2) }, (_, i) => products.slice(i * 2, i * 2 + 2)).map(
                        (innerProducts, idx) => (
                            <View key={idx} style={{ flexDirection: 'row', gap: 6 }}>
                                {innerProducts.map((product, idx) => (
                                    <ProductCard key={idx} {...product} style={{ aspectRatio: 1 }} />
                                ))}
                                {innerProducts.length === 1 ? <View style={{ flex: 1 }} /> : null}
                            </View>
                        )
                    )}
                </View>
            </ScrollView>

            <BottomSheetModal
                index={0}
                snapPoints={['80%']}
                ref={bottomSheetModalRef}
                backdropComponent={(props) => <CustomBackdrop {...props} />}
                backgroundStyle={{ borderRadius: 24, backgroundColor: colors.background }}
                handleIndicatorStyle={{ backgroundColor: colors.primary }}>
                <FilterView />
            </BottomSheetModal>
        </SafeAreaView>
    );
}
