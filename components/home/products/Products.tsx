import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useProductState } from 'hooks/useProductState';
import { ActivityIndicator, View } from 'react-native';
import type { Product } from 'types';
import { axios } from 'utilities/axios';

import ProductCard from './ProductCard';

export default function Products() {
    const { colors } = useTheme();
    const { query } = useProductState();
    const { category, ...params } = query;

    const { data, isLoading } = useQuery<{ products: Product[]; total: number; skip: number; limit: number }>({
        queryKey: ['products', { category, ...params }],
        queryFn: async () => await axios.get(category ? `/products/category/${category}` : '/products', { params }).then((res) => res.data),
    });

    return (
        <View style={{ gap: 6 }}>
            {data?.products?.length
                ? Array.from({ length: Math.ceil(data.products.length / 2) }, (_, i) => data.products.slice(i * 2, i * 2 + 2)).map(
                      (innerProducts, idx) => (
                          <View key={idx} style={{ flexDirection: 'row', gap: 6 }}>
                              {innerProducts.map((product, idx) => (
                                  <ProductCard key={idx} {...product} />
                              ))}
                              {innerProducts.length === 1 ? <View style={{ flex: 1 }} /> : null}
                          </View>
                      )
                  )
                : null}

            {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
        </View>
    );
}
