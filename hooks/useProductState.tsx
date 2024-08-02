import { SecureStorage } from 'utilities/storage';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type Query = { category: string };

interface ProductState {
    query: Query;
    setQuery: (name: keyof Query, value: string) => void;
}

export const useProductState = create<ProductState>()(
    devtools(
        persist(
            (set) => ({
                query: { category: '' },
                setQuery: (name, value) => set(({ query }) => ({ query: { ...query, [name]: value } })),
            }),
            { name: 'eCommerceProducts', storage: createJSONStorage(() => SecureStorage) }
        )
    )
);
