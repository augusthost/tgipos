// import {
//   createItem,
//   updateItem,
//   getItem,
//   deleteItem
// } from '@/utils/fetchServices';
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
//   useCallback
// } from 'react';
// import { CartItem, MenuItem } from '@/types';

// interface CartContextType {
//   cartItems: CartItem[];
//   addItem: (item: MenuItem) => Promise<void>;
//   removeItem: (itemId: string) => Promise<void>;
//   updateQuantity: (itemId: string, quantity: number) => Promise<void>;
//   clearCart: () => void;
//   getItemCount: () => number;
//   getTotal: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const CART_STORAGE_KEY = 'cart';

// const loadCartFromStorage = (): CartItem[] => {
//   try {
//     const savedCart = localStorage.getItem(CART_STORAGE_KEY);
//     return savedCart ? JSON.parse(savedCart) : [];
//   } catch (error) {
//     console.error('Failed to load cart from localStorage:', error);
//     return [];
//   }
// };

// const saveCartToStorage = (cartItems: CartItem[]) => {
//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
//   } catch (error) {
//     console.error('Failed to save cart to localStorage:', error);
//   }
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromStorage);
//   // We keep track of the order created on the server
//   const [orderId, setOrderId] = useState<string | null>(null);

//   useEffect(() => {
//     saveCartToStorage(cartItems);
//   }, [cartItems]);

//   // Helper: Create a new order on the server
//   const createOrder = useCallback(async (): Promise<string> => {
//     // Prepare order data. You might need to add table_id/waiter_id etc.
//     const orderData = {
//       status: 'pending',
//       table: {
//         _model: 'table',
//         _id: 'f91d77ba343865c43d000201'
//       },
//       order_type: 'dine-in',
//       total_amount: 0
//     };
//     const serverOrder = await createItem('order', orderData);
//     return serverOrder?.id;
//   }, []);

//   // Helper: Create or update the orderItem on the server
//   const persistOrderItem = useCallback(
//     async (item: MenuItem, quantity: number) => {

//       console.log(orderId)
//       const order = {
//         _model: "order",
//         _id: orderId
//       }

//       const menu = {
//         _model: "menu",
//         _id: item._id
//       }

//       try {
//         // Check if the order item exists on the server
//         const existing = await getItem('orderitem', item._id);
//         if (existing) {
//           // Update the order item quantity on the server
//           await updateItem('orderitem', { _id: item._id, quantity, order, menu });
//         } else {
//           const orderItemData = { ...item, quantity, order, menu };
//           await createItem('orderitem', orderItemData);
//         }
//       } catch (err) {
//         console.error('Error persisting order item:', err);
//       }
//     },
//     [orderId]
//   );

//   const addItem = useCallback(async (item: MenuItem) => {
//     // If there's no order created yet, create a new order first.
//     if (!orderId) {
//       try {
//         const newOrderId = await createOrder();
//         setOrderId(newOrderId);
//       } catch (err) {
//         console.error('Failed to create order:', err);
//         return;
//       }
//     }

//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(cartItem => cartItem._id === item._id);
//       let updatedItems: CartItem[];

//       if (existingItem) {
//         updatedItems = prevItems.map(cartItem =>
//           cartItem._id === item._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//         // Persist update on server (non-blocking)
//         persistOrderItem(item, existingItem.quantity + 1);
//       } else {
//         const newItem: CartItem = { ...item, quantity: 1 };
//         updatedItems = [...prevItems, newItem];
//         // Persist new item on server (non-blocking)
//         persistOrderItem(item, 1);
//       }
//       return updatedItems;
//     });
//   }, [orderId, createOrder, persistOrderItem]);

//   const removeItem = useCallback(async (itemId: string) => {
//     setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
//     // Optionally remove the order item from the server
//     try {
//       await deleteItem('orderitem', itemId);
//     } catch (err) {
//       console.error('Failed to remove order item on server:', err);
//     }
//   }, []);

//   const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
//     if (quantity < 1) return;
//     setCartItems(prevItems =>
//       prevItems.map(item => (item._id === itemId ? { ...item, quantity } : item))
//     );
//     try {
//       await updateItem('orderitem', { id: itemId, quantity });
//     } catch (err) {
//       console.error('Failed to update order item quantity on server:', err);
//     }
//   }, []);

//   const clearCart = useCallback(() => {
//     setCartItems([]);
//     // Optionally, you may want to clear or cancel the order on the server as well.
//     setOrderId(null);
//   }, []);

//   const getItemCount = useCallback(() => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   }, [cartItems]);

//   const getTotal = useCallback(() => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//         getItemCount,
//         getTotal
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };