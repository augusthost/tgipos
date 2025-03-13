// services/tableService.ts
import { Table } from '@/types'

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchTables = async (): Promise<Table[]> => {
    const response = await fetch(`${API_URL}/api/content/items/table`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch tables');
    return response.json();
};

export const createTable = async (table: Table): Promise<Table> => {
    const response = await fetch(`${API_URL}/api/content/item/table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY},
        body: JSON.stringify({data:table}),
    });
    if (!response.ok) throw new Error('Failed to create table');
    return response.json();
};

export const updateTable = async (table: Table): Promise<Table> => {
    const response = await fetch(`${API_URL}/api/content/item/table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY },
        body: JSON.stringify({data:table}),
    });
    if (!response.ok) throw new Error('Failed to update table');
    return response.json();
};

export const deleteTable = async (tableId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/content/item/${tableId}`, { 
        method: 'DELETE' , 
        headers: { 'Content-Type': 'application/json', 'api-key' : API_KEY }
    });
    if (!response.ok) throw new Error('Failed to delete table');
};