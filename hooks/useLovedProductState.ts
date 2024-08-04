import { create } from 'zustand';

type LovedProduct = { id: number; title: string; thumbnail: string; price: number };

type LovedProductsState = {
    lovedProducts: LovedProduct[];
    addToLovedProducts: (product: LovedProduct) => void;
    removeFromLovedProducts: (id: number) => void;
    clearLovedProducts: () => void;
};

export const useLovedProductsState = create<LovedProductsState>((set) => ({
    lovedProducts: [],
    addToLovedProducts: (product) =>
        set(({ lovedProducts }) => {
            const isExist = lovedProducts.find((p) => p.id === product.id);
            if (!isExist) return { lovedProducts: [...lovedProducts, product] };

            return { lovedProducts };
        }),
    removeFromLovedProducts: (id) => set(({ lovedProducts }) => ({ lovedProducts: lovedProducts.filter((product) => product.id !== id) })),
    clearLovedProducts: () => set(() => ({ lovedProducts: [] })),
}));
