import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Query = { category: string; limit: string; select: string };

interface ProductState {
    query: Query;
    setQuery: (name: keyof Query, value: string) => void;
    count: number;
    setCount: (count: number) => void;
}

export const useProductState = create<ProductState>()(
    devtools((set) => ({
        query: { category: '', limit: '10', select: 'title,thumbnail,price,discountPercentage' },
        setQuery: (name, value) => set(({ query }) => ({ query: { ...query, [name]: value } })),
        count: 1,
        setCount: (count) => set({ count }),
    }))
);
