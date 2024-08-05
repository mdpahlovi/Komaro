import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Categories, Products, Filter, Header, useProductInfinityQuery } from 'components/home';
import { Filter as FilterIcon } from 'components/icons';
import { Button, Input } from 'components/ui';
import { useColors } from 'hooks/useColors';
import { useRef } from 'react';
import { View, ScrollView, type NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - (16 + 28);

export default function HomeScreen() {
    const { text } = useColors();
    const queryResult = useProductInfinityQuery();
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

    const { fetchNextPage, isFetchingNextPage } = queryResult;

    return (
        <SafeAreaView>
            <ScrollView
                onScroll={({ nativeEvent }) => (isCloseToBottom(nativeEvent) && !isFetchingNextPage ? fetchNextPage() : null)}
                contentContainerStyle={{ padding: 16, paddingBottom: 16 + 28, gap: 16 }}>
                <Header />
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Input placeholder="Search..." />
                    <Button variant="primary" onPress={() => bottomSheetModalRef.current?.present()} iconButton>
                        <FilterIcon color={text} />
                    </Button>
                </View>
                <Categories />
                <Products queryResult={queryResult} />
            </ScrollView>

            {/* Filter Section */}
            <Filter bottomSheetModalRef={bottomSheetModalRef} />
        </SafeAreaView>
    );
}
