// create zustand store
import { fetchOrder, updateOrder } from '@/services/orderService'
import { Order } from '@/types'
import { create } from 'zustand'


type OrderStore = {
    orders: Order[],
    getOrders: () => Order[],
    setOrders: (orders: Order[]) => void,
    getOrder: (id: string) => Promise<Order | Order[]>,
    addOrder: (Order: Order) => void,
    removeOrder: (Order: Order) => void,
    updateOrder: (Order: Order) => void
}

// create orders store
export const useOrderStore = create<OrderStore>((set, get) => ({
    orders: [],
    getOrders: () => get().orders,
    setOrders: (orders: Order[]) => set({ orders }),
    getOrder: async (id: string) => {
        const order = get().orders.find((order) => order._id === id);
        if(order) return order;
        return await fetchOrder(id);
    },
    addOrder: (Order) => set((state) => ({ orders: [...state.orders, Order] })),
    removeOrder: (Order) => set((state) => ({ orders: state.orders.filter((item) => item._id !== Order._id) })),
    updateOrder: async (Order) => {
        try{
            set((state) => ({ orders: state.orders.map((item) => (item._id === Order._id ? Order : item)) }))
            await updateOrder(Order);
        }   catch (error) {
            console.error('Error updating order:', error);
        }
    }
}))