
import { MenuItem, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Popular',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat2',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat3',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat4',
    name: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat5',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'cat6',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=150&auto=format&fit=crop'
  }
];

export const menuItems: MenuItem[] = [
  {
    id: 'item1',
    name: 'Classic Burger',
    price: 9.99,
    category: 'cat2',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce'
  },
  {
    id: 'item2',
    name: 'Margherita Pizza',
    price: 12.99,
    category: 'cat3',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=300&auto=format&fit=crop',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil'
  },
  {
    id: 'item3',
    name: 'Caesar Salad',
    price: 8.49,
    category: 'cat4',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=300&auto=format&fit=crop',
    description: 'Romaine lettuce with parmesan, croutons, and Caesar dressing'
  },
  {
    id: 'item4',
    name: 'Veggie Burger',
    price: 10.99,
    category: 'cat2',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=300&auto=format&fit=crop',
    description: 'Plant-based patty with lettuce, tomato, and special sauce'
  },
  {
    id: 'item5',
    name: 'Pepperoni Pizza',
    price: 14.99,
    category: 'cat3',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=300&auto=format&fit=crop',
    description: 'Pizza with tomato sauce, mozzarella, and pepperoni'
  },
  {
    id: 'item6',
    name: 'Greek Salad',
    price: 9.49,
    category: 'cat4',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop',
    description: 'Mixed greens with feta, olives, cucumber, and vinaigrette'
  },
  {
    id: 'item7',
    name: 'Iced Coffee',
    price: 4.99,
    category: 'cat5',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=300&auto=format&fit=crop',
    description: 'Cold brewed coffee served over ice'
  },
  {
    id: 'item8',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'cat6',
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?q=80&w=300&auto=format&fit=crop',
    description: 'Rich chocolate cake with a layer of fudge frosting'
  },
  {
    id: 'item9',
    name: 'Double Cheeseburger',
    price: 12.99,
    category: 'cat2',
    image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?q=80&w=300&auto=format&fit=crop',
    description: 'Two beef patties with double cheese, lettuce, tomato, and special sauce'
  },
  {
    id: 'item10',
    name: 'Vegetarian Pizza',
    price: 13.99,
    category: 'cat3',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop',
    description: 'Pizza with tomato sauce, mozzarella, bell peppers, onions, and mushrooms'
  },
  {
    id: 'item11',
    name: 'Fruit Smoothie',
    price: 5.99,
    category: 'cat5',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=300&auto=format&fit=crop',
    description: 'Blend of seasonal fruits with yogurt and honey'
  },
  {
    id: 'item12',
    name: 'Cheesecake',
    price: 7.49,
    category: 'cat6',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=300&auto=format&fit=crop',
    description: 'Creamy cheesecake with a graham cracker crust'
  }
];
