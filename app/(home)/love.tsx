import { Text } from 'components/ui';
import { useColors } from 'hooks/useColors';
import { useLovedProductsState } from 'hooks/useLovedProductState';
import { FlatList, Image, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function PaymentScreen() {
    const { card: backgroundColor, border: borderColor } = useColors();
    const { lovedProducts, removeFromLovedProducts } = useLovedProductsState();

    return (
        <FlatList
            data={lovedProducts}
            style={{ padding: 16 }}
            ListEmptyComponent={<Text variant="body">OPPS! No Loved Products Available...!</Text>}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item: { id, title, thumbnail, price } }) => (
                <Swipeable key={id} renderRightActions={() => <RightAction />} onSwipeableOpen={() => removeFromLovedProducts(id)}>
                    <View style={{ flex: 1, backgroundColor, flexDirection: 'row', borderWidth: 1, borderColor, borderRadius: 20 }}>
                        <Image src={thumbnail} style={{ width: 96, height: 96 }} />
                        <View style={{ flex: 1, justifyContent: 'center', padding: 6 }}>
                            <Text variant="title-lg">{title}</Text>
                            <Text variant="heading">{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
                        </View>
                    </View>
                </Swipeable>
            )}
        />
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
