import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Text } from 'components/ui';
import { useColors } from 'hooks/useColors';
import { ActivityIndicator, View } from 'react-native';
import type { ProductResponse } from 'types';

import ProductCard from './ProductCard';

export default function Products({ queryResult }: { queryResult: UseInfiniteQueryResult<InfiniteData<ProductResponse, unknown>, Error> }) {
    const { primary } = useColors();
    const { data, isLoading, isFetchingNextPage } = queryResult;

    return (
        <View style={{ gap: 6 }}>
            {data?.pages?.length
                ? data?.pages?.map(({ products }) =>
                      Array.from({ length: Math.ceil(products.length / 2) }, (_, i) => products.slice(i * 2, i * 2 + 2)).map(
                          (innerProducts, idx) => (
                              <View key={idx} style={{ flexDirection: 'row', gap: 6 }}>
                                  {innerProducts.map((product, idx) => (
                                      <ProductCard key={idx} {...product} />
                                  ))}
                                  {innerProducts.length === 1 ? <View style={{ flex: 1 }} /> : null}
                              </View>
                          )
                      )
                  )
                : null}

            {isLoading || isFetchingNextPage ? <ActivityIndicator size="large" color={primary} /> : null}
            {!data?.pages?.length && !isLoading && !isFetchingNextPage ? <Text variant="body">OPPS! No Products Available...!</Text> : null}
        </View>
    );
}
