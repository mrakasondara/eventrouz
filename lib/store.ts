import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

export interface CartItem {
  id?: number;
  event_name?: string;
  ticket_category_name?: string;
  price?: number;
}

type CartStore = {
  cart: CartItem[];
  addToCart: (event: CartItem) => void;
  resetCart: () => void;
  removeFromCart: (id: number) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart(event) {
        const { cart } = get();

        set({ cart: [...cart, event] });
      },

      resetCart() {
        set({ cart: [] });
      },

      removeFromCart(id) {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },
    }),
    {
      name: "event-cart-storage",
    }
  )
);
