// services/orderService.ts
import { Order } from '@/types'

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch(`${API_URL}/api/content/items/order`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};


export const fetchOrder = async (orderId : string): Promise<Order[]> => {
    const response = await fetch(`${API_URL}/api/content/items/order/${orderId}`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

export const createOrder = async (order: Order): Promise<Order> => {
    const response = await fetch(`${API_URL}/api/content/item/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY},
        body: JSON.stringify({data:order}),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
};

export const updateOrder = async (order: Order): Promise<Order> => {
    const response = await fetch(`${API_URL}/api/content/item/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY },
        body: JSON.stringify({data:order}),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
};

export const deleteOrder = async (orderId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/content/item/${orderId}`, { 
        method: 'DELETE' , 
        headers: { 'Content-Type': 'application/json', 'api-key' : API_KEY }
    });
    if (!response.ok) throw new Error('Failed to delete order');
};