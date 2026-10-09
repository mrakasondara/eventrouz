import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartAPI } from "./services/api/cart-api";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

export interface CartItemStore {
  ticket_category_id?: number;
  total_ticket: number;
  event_ticket_date?: string[] | null | string;
}

interface Event {
  id: number;
  title: string;
}

interface TicketCategory {
  id: number;
  name: string;
  price: number;
  is_package: boolean | number;
  event?: Event;
}

export interface CartItem {
  id: number;
  ticket_category_id: number;
  event_ticket_date: string;
  total_ticket: number;
  ticket_category?: TicketCategory;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
}

export interface bulkDeleteBody {
  cart_item_ids?: number[];
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  fetchCart: (token?: string) => Promise<void>;
  addToCart: (
    token?: string,
    payload?: CartItemStore
  ) => Promise<{ success: boolean; message: string }>;
  removeItem: (
    token?: string,
    itemId?: number
  ) => Promise<{ success: boolean; message: string }>;
  removeItems: (
    token?: string,
    body?: bulkDeleteBody
  ) => Promise<{ success: boolean; message: string }>;
  clearCart: (token?: string) => Promise<{ success: boolean; message: string }>;

  getTotalItems: () => number;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CartAPI.getCartItems(token ?? "");
      set({ cart: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.message || "Gagal memuat keranjang",
        isLoading: false,
      });
    }
  },

  addToCart: async (token, payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CartAPI.addCartItems(token ?? "", payload ?? []);

      set({ isLoading: false });

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      const errorMessage = error.response?.message || "Gagal memuat keranjang";
      set({
        error: errorMessage,
        isLoading: false,
      });
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  removeItem: async (token, itemId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CartAPI.removeCartItem(token ?? "", itemId ?? 0);

      set({ isLoading: false });

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      const errorMessage = error.response?.message || "Gagal memuat keranjang";
      set({
        error: errorMessage,
        isLoading: false,
      });
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  removeItems: async (token, body) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CartAPI.removeCartItems(token ?? "", body ?? {});

      set({ isLoading: false });

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      const errorMessage = error.response?.message || "Gagal memuat keranjang";
      set({
        error: errorMessage,
        isLoading: false,
      });
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  clearCart: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CartAPI.clearCart(token ?? "");

      set({ isLoading: false });

      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: any) {
      const errorMessage = error.response?.message || "Gagal memuat keranjang";
      set({
        error: errorMessage,
        isLoading: false,
      });
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  getTotalItems: () => {
    const cart = get().cart;
    if (!cart || !cart.items) return 0;

    return cart.items.reduce((total, item) => total + item.total_ticket, 0);
  },
}));
