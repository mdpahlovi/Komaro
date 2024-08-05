import { useQuery } from '@tanstack/react-query';
import { Skeleton, Button } from 'components/ui';
import { useProductState } from 'hooks/useProductState';
import { FlatList, View } from 'react-native';
import { axios } from 'utilities/axios';

export default function Categories() {
    const { query, setQuery } = useProductState();
    const { data, isLoading } = useQuery<{ name: string; slug: string }[]>({
        queryKey: ['categories'],
        queryFn: async () => await axios.get('/products/categories').then((res) => res.data),
    });

    if (isLoading)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} style={{ flex: 1, height: 32 }} />
                ))}
            </View>
        );

    if (data)
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ name: 'All', slug: '' }, ...data]}
                contentContainerStyle={{ alignItems: 'center', gap: 6 }}
                renderItem={({ item: { name, slug }, index }) => (
                    <Button
                        key={index}
                        onPress={() => setQuery('category', slug)}
                        variant={slug === query?.category ? 'primary' : 'default'}
                        style={{ height: 32, paddingHorizontal: 12 }}>
                        {name}
                    </Button>
                )}
            />
        );
}
