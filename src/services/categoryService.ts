// services/categoryService.ts
import { Category } from '@/types'

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/api/content/tree/category`,{
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY}
    });
    if (!response.ok) throw new Error('Failed to fetch categorys');
    return response.json();
};

export const createCategory = async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_URL}/api/content/item/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY},
        body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
};

export const updateCategory = async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_URL}/api/content/item/${category._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'api-key' : API_KEY },
        body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/content/item/${categoryId}`, { 
        method: 'DELETE' , 
        headers: { 'Content-Type': 'application/json', 'api-key' : API_KEY }
    });
    if (!response.ok) throw new Error('Failed to delete category');
};