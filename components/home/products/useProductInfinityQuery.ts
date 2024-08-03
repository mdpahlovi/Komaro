import { useInfiniteQuery } from '@tanstack/react-query';
import { useProductState } from 'hooks/useProductState';
import type { ProductResponse } from 'types';
import { axios } from 'utilities/axios';

export function useProductInfinityQuery() {
    const { query } = useProductState();
    const { category, ...params } = query;

    return useInfiniteQuery<ProductResponse>({
        queryKey: ['products', { category, ...params }],
        queryFn: async ({ pageParam }) =>
            await axios
                .get(category ? `/products/category/${category}` : '/products', { params: { skip: Number(pageParam) * 10, ...params } })
                .then((res) => res.data),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParams) => (lastPage?.skip + 10 < lastPage?.total ? Number(lastPageParams) + 1 : null),
    });
}
