
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
