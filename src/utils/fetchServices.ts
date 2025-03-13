const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Fetch all items for a given model
export const getItems = async (model: string) => {
  const response = await fetch(`${API_URL}/api/content/items/${model}`, {
    headers: { 'api-key': API_KEY }
  });
  if (!response.ok) throw new Error(`Could not fetch ${model}`);
  return await response.json();
};

// Fetch a single item based on model and item id
export const getItem = async (model: string, id: string) => {
  const response = await fetch(`${API_URL}/api/content/item/${model}/${id}`, {
    headers: { 'api-key': API_KEY }
  });
  if (!response.ok) return null;
  return await response.json();
};

// Create an item at the server side for a given model
export const createItem = async (model: string, data: any) => {
  const response = await fetch(`${API_URL}/api/content/item/${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY
    },
    body: JSON.stringify({data})
  });
  if (!response.ok) throw new Error(`Failed to create ${model}`);
  return await response.json();
};

// Update an item at the server side for a given model
export const updateItem = async (model: string, data: any) => {
  const response = await fetch(`${API_URL}/api/content/item/${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY
    },
    body: JSON.stringify({data})
  });
  if (!response.ok) throw new Error(`Failed to update ${model}`);
  return await response.json();
};

// Delete an item at the server side for a given model
export const deleteItem = async (model: string, id: string) => {
  const response = await fetch(`${API_URL}/api/content/item/${model}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY
    }
  });
  if (!response.ok) throw new Error(`Failed to delete ${model}`);
  return await response.json();
};
