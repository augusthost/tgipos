import { OrderItem, OrderItemStatus } from '@/types';
import { create } from 'zustand';
import { shared } from 'use-broadcast-ts';
import {
    createOrderItem,
    deleteOrderItem,
    fetchOrderItems,
    updateOrderItem
} from '@/services/orderItemsService';

// Define the state type for the order items store
type OrderItemStore = {
    orderId: string | null;
    setOrderId: (id: string) => void;
    orderItems: OrderItem[];
    setOrderItems: (orderItems: OrderItem[]) => Promise<void>;
    addOrderItem: (orderItem: OrderItem) => Promise<void>;
    removeOrderItem: (id: string) => void;
    updateOrderItem: (orderItem: OrderItem) => Promise<void>;
    updateQuantity: (id: string, qty: number) => void;
    clearOrderItems: () => void;
    getTotal: () => number;
};

export const useOrderItemsStore = create<OrderItemStore>(
    (set, get) => ({
        orderId: null,
        setOrderId: (id: string) => set({ orderId: id }),
        orderItems: [],
        // Fetch order items from the server and update state
        setOrderItems: async (data) => {
            set({ orderItems: data });
        },

        // Add an order item, updating local state first, then the server
        addOrderItem: async (orderItem: OrderItem) => {

            const responseItem = await createOrderItem(orderItem);
            set((state) => ({ orderItems: [...state.orderItems, responseItem] }));

        },

        // Remove an order item from state and server
        removeOrderItem: async (id: string) => {
            set((state) => ({
                orderItems: state.orderItems.filter((item) => {
                    return item._id !== id
                })
            }));
            deleteOrderItem(id);
        },

        // Update an order item locally and on the server
        updateOrderItem: async (orderItem: OrderItem) => {
            // Example: Fetch updated data before setting state
            const updatedItem = await updateOrderItem(orderItem);
            set((state) => ({
                orderItems: state.orderItems.map((item) =>
                    item._id === updatedItem._id ? { ...item, ...updatedItem } : item
                ),
            }));
        },        

        // Update the quantity of an item and synchronize with the server
        updateQuantity: async (id: string, qty: number) => {

            // update state
            set((state) => ({
                orderItems: state.orderItems.map((item) =>
                    item.menu._id === id ? { ...item, quantity: qty } : item
                )
            }));

            const updatedItem = get().orderItems.find((item) => {
                return item._id === id;
            });
            if (!updatedItem) return;
            updatedItem.quantity = qty;

            updateOrderItem(updatedItem);
        },

        // Clear all order items
        clearOrderItems: () => set({ orderId: null, orderItems: [] }),

        // Calculate the total cost of all order items
        getTotal: () => {
            const items = get().orderItems.filter((item) => item.status !== OrderItemStatus.Cancelled);
            return items.reduce((total, item) => total + item.price * item.quantity, 0)
        }
    })
);