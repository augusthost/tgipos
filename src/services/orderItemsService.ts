// services/orderitemService.ts
import { OrderItem } from '@/types'

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchOrderItems = async (): Promise<OrderItem[]> => {
    const response = await fetch(`${API_URL}/api/content/items/orderitem`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch orderItems');
    return response.json();
};


export const fetchOrderItem = async (orderItemId : string): Promise<OrderItem[]> => {
    const response = await fetch(`${API_URL}/api/content/items/orderitem/${orderItemId}`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch orderItems');
    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrderItem = async (orderItem: any): Promise<OrderItem> => {
    const response = await fetch(`${API_URL}/api/content/item/orderitem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY},
        body: JSON.stringify({data:orderItem}),
    });
    if (!response.ok) throw new Error('Failed to create orderItem');
    return response.json();
};

export const updateOrderItem = async (orderItem: OrderItem): Promise<OrderItem> => {
    const response = await fetch(`${API_URL}/api/content/item/${orderItem._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY },
        body: JSON.stringify({data:orderItem}),
    });
    if (!response.ok) throw new Error('Failed to update orderItem');
    return response.json();
};

export const deleteOrderItem = async (orderItemId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/content/item/${orderItemId}`, { 
        method: 'DELETE' , 
        headers: { 'Content-Type': 'application/json', 'api-key' : API_KEY }
    });
    if (!response.ok) throw new Error('Failed to delete orderItem');
};