// create zustand store
import { fetchOrder } from '@/services/orderService'
import { Order } from '@/types'
import { create } from 'zustand'


type OrderStore = {
    orders: Order[],
    getOrders: () => Order[],
    getOrder: (id: string) => Order | undefined,
    addOrder: (Order: Order) => void,
    removeOrder: (Order: Order) => void,
    updateOrder: (Order: Order) => void
}

// create orders store
export const userOrderStore = create<OrderStore>((set, get) => ({
    orders: [],
    getOrders: () => get().orders,
    getOrder: (id: string) => {
        return get().orders.find((order) => order._id === id);
    },
    addOrder: (Order) => set((state) => ({ orders: [...state.orders, Order] })),
    removeOrder: (Order) => set((state) => ({ orders: state.orders.filter((item) => item._id !== Order._id) })),
    updateOrder: (Order) => set((state) => ({ orders: state.orders.map((item) => (item._id === Order._id ? Order : item)) }))
}))