// create zustand store
import { create } from 'zustand'

type CartStore = {
    cartCollapsed: boolean
    setCartCollapsed: (collapsed: boolean) => void
}

// create menus store
export const useCartStore = create<CartStore>((set, get) => ({
    cartCollapsed: false,
    setCartCollapsed: (cartCollapsed) => set({ cartCollapsed }),
}))