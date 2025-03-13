import { OrderItem } from '@/types'
import { create } from 'zustand'
import { createOrder } from '@/services/orderService'

type OrderItemStore = {
    orderId: string | null;
    orderItems: OrderItem[];
    getOrderItems: () => OrderItem[];
    addOrderItem: (orderItem: OrderItem) => Promise<void>;
    removeOrderItem: (id: string) => void;
    updateOrderItem: (orderItem: OrderItem) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearOrderItems: () => void;
    getTotal: () => number;
}

export const useOrderItemsStore = create<OrderItemStore>((set, get) => ({
    orderId: null,
    orderItems: [],

    getOrderItems: () => get().orderItems,

    addOrderItem: async (orderItem) => {
        const { orderId, orderItems } = get();
        const currentOrderId = orderId;

        try {
            // If this is the first item, create an order
            // if (!currentOrderId) {
            //     const order = await createOrder({ waiterId: 'some-waiter-id' });
            //     currentOrderId = order._id;
            //     set({ orderId: currentOrderId });
            // }

            // Add the item to the order
            // await addOrderItemToOrder(currentOrderId, {
            //     itemId: orderItem._id,
            //     quantity: 1,
            //     price: orderItem.price
            // });

            // Update state with the new item or increment quantity
            set((state) => {
                const existingItem = state.orderItems.find((item) => item._id === orderItem._id);

                return {
                    orderItems: existingItem
                        ? state.orderItems.map((item) =>
                              item._id === orderItem._id ? { ...item, quantity: item.quantity + 1 } : item
                          )
                        : [...state.orderItems, { ...orderItem, quantity: 1 }]
                };
            });
        } catch (error) {
            console.error('Error adding order item:', error);
        }
    },

    removeOrderItem: (id: string) =>
        set((state) => ({
            orderItems: state.orderItems.filter((item) => item._id !== id)
        })),

    updateOrderItem: (orderItem) =>
        set((state) => ({
            orderItems: state.orderItems.map((item) =>
                item._id === orderItem._id ? orderItem : item
            )
        })),

    updateQuantity: (id, qty) =>
        set((state) => ({
            orderItems: state.orderItems.map((item) =>
                item._id === id ? { ...item, quantity: qty } : item
            )
        })),

    clearOrderItems: () => set({ orderId: null, orderItems: [] }),

    getTotal: () =>
        get().orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
}));
