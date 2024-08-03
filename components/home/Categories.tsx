import { useQuery } from '@tanstack/react-query';
import { Button } from 'components/ui';
import { useProductState } from 'hooks/useProductState';
import { FlatList } from 'react-native';
import { axios } from 'utilities/axios';

export default function Categories() {
    const { query, setQuery } = useProductState();
    const { data } = useQuery<{ name: string; slug: string }[]>({
        queryKey: ['categories'],
        queryFn: async () => await axios.get('/products/categories').then((res) => res.data),
    });

    return (
        <FlatList
            horizontal
            data={[{ name: 'All', slug: '' }, ...(data ? data : [...Array(5)])]}
            style={{ maxHeight: 48 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6, alignItems: 'center' }}
            renderItem={({ item, index }) => (
                <Button
                    key={index}
                    variant={item?.slug === query?.category ? 'primary' : 'default'}
                    size="small"
                    onPress={() => setQuery('category', item?.slug || '')}
                    style={{ height: 32, paddingHorizontal: 12 }}>
                    {item?.name || '          '}
                </Button>
            )}
        />
    );
}
