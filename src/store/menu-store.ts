// create zustand store
import { Menu } from '@/types'
import { create } from 'zustand'

type MenuStore = {
    menus: Menu[],
    getMenus: () => Menu[],
    addMenu: (Menu: Menu) => void,
    removeMenu: (Menu: Menu) => void,
    updateMenu: (Menu: Menu) => void
}

// create menus store
export const usemenusStore = create<MenuStore>((set, get) => ({
    menus: [],
    getMenus: () => get().menus,
    addMenu: (menu) => set((state) => ({ menus: [...state.menus, menu] })),
    removeMenu: (menu) => set((state) => ({ menus: state.menus.filter((item) => item._id !== menu._id) })),
    updateMenu: (menu) => set((state) => ({ menus: state.menus.map((item) => (item._id === menu._id ? menu : item)) }))
}))