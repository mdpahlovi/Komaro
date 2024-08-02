import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { Categories, Products, Filter, Header } from 'components/home';
import { Filter as FilterIcon } from 'components/icons';
import { Button, Input } from 'components/ui';
import { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { colors } = useTheme();
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 16 + 28, gap: 16 }}>
                <Header />
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Input placeholder="Search..." />
                    <Button variant="primary" onPress={() => bottomSheetModalRef.current?.present()} iconButton>
                        <FilterIcon color={colors.text} />
                    </Button>
                </View>
                <Categories />
                <Products />
            </ScrollView>

            {/* Filter Section */}
            <Filter bottomSheetModalRef={bottomSheetModalRef} />
        </SafeAreaView>
    );
}
