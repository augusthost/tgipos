// services/orderitemService
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderItem } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetcher = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', 'api-key': API_KEY },
        ...options,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const useFetchOrderItems = (orderId: string, enabled: boolean) => 
    useQuery<OrderItem[]>({
        queryKey: ['orderItems', orderId],
        queryFn: () => fetcher(`${API_URL}/api/content/items/orderitem?populate=1&filter={order:"${orderId}"}`),
        enabled, // Ensures it only runs when orderId is available,
        placeholderData: []
    });


export const useFetchKitchenOrderItems = () => 
    useQuery<OrderItem[]>({
        queryKey: ['kitchenOrderItems'],
        queryFn: () => fetcher(`${API_URL}/api/content/items/orderitem?populate=1&sort={_created:-1}&filter={status:"in-kitchen"}`),
    });

export const useFetchOrderItem = (orderItemId: string) => 
    useQuery<OrderItem>({
        queryKey: ['orderItem'],
        queryFn: () => fetcher(`${API_URL}/api/content/items/orderitem/${orderItemId}`),
    });

export const useCreateOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderItem: Partial<OrderItem>) => 
            fetcher(`${API_URL}/api/content/item/orderitem`, {
                method: 'POST',
                body: JSON.stringify({ data: orderItem }),
        }),
        onSuccess: (_, variables) => {
            console.log(variables)
            if (variables.order) {
                // Invalidate the cache to mark it as stale
                queryClient.invalidateQueries({ queryKey: ['orderItems', variables.order?._id] });
            }
        },
    });
};

export const useUpdateOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderItem: Partial<OrderItem>) => 
            fetcher(`${API_URL}/api/content/item/orderitem`, {
                method: 'POST',
                body: JSON.stringify({ data: orderItem }),
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
    });
};

export const useDeleteOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderItemId: string) => 
            fetcher(`${API_URL}/api/content/item/orderitem/${orderItemId}`, {
                method: 'DELETE',
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orderItems'] }),
    });
};
