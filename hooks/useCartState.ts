import { create } from 'zustand';

type Cart = { id: number; title: string; thumbnail: string; price: number; quantity: number; stock: number };

type CartState = {
    items: Cart[];
    addToCart: (item: Cart) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
};

export const useCartState = create<CartState>((set) => ({
    items: [],
    addToCart: (item) =>
        set(({ items }) => {
            const isExist = items.find((i) => i.id === item.id);
            if (isExist) {
                return { items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)) };
            } else {
                return { items: [...items, item] };
            }
        }),
    removeFromCart: (id) => set(({ items }) => ({ items: items.filter((item) => item.id !== id) })),
    updateQuantity: (id, quantity) => set(({ items }) => ({ items: items.map((item) => (item.id === id ? { ...item, quantity } : item)) })),
    clearCart: () => set(() => ({ items: [] })),
}));
