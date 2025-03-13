// services/menuService.ts
import { Menu } from '@/types'

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchMenus = async (): Promise<Menu[]> => {
    const response = await fetch(`${API_URL}/api/content/items/menu`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch menus');
    return response.json();
};

export const createMenu = async (menu: Menu): Promise<Menu> => {
    const response = await fetch(`${API_URL}/api/content/item/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY},
        body: JSON.stringify(menu),
    });
    if (!response.ok) throw new Error('Failed to create menu');
    return response.json();
};

export const updateMenu = async (menu: Menu): Promise<Menu> => {
    const response = await fetch(`${API_URL}/api/content/item/${menu._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY },
        body: JSON.stringify(menu),
    });
    if (!response.ok) throw new Error('Failed to update menu');
    return response.json();
};

export const deleteMenu = async (menuId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/content/item/${menuId}`, { 
        method: 'DELETE' , 
        headers: { 'Content-Type': 'application/json', 'api-key' : API_KEY }
    });
    if (!response.ok) throw new Error('Failed to delete menu');
};