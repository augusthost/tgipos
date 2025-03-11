
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  X,
  CreditCard, 
  Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/types';

interface CartSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const CartSidebar = ({ collapsed, setCollapsed }: CartSidebarProps) => {
  const { cartItems, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const sidebarVariants = {
    expanded: { width: 380, opacity: 1 },
    collapsed: { width: 0, opacity: 0 }
  };
  
  return (
    <motion.div
      className={cn(
        "h-screen border-l border-border bg-white shadow-sm z-20",
        collapsed ? "hidden" : "block"
      )}
      initial="collapsed"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Cart</h2>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-gray-400"
              >
                <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </motion.div>
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (10%)</span>
              <span>${(getTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(getTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="flex items-center justify-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 btn-hover"
              onClick={() => clearCart()}
              disabled={cartItems.length === 0}
            >
              <Printer className="h-5 w-5 mr-2" />
              <span>Print Receipt</span>
            </button>
            <button 
              className="flex items-center justify-center p-3 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors duration-200 btn-hover"
              disabled={cartItems.length === 0}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Pay Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Placeholder icon for empty cart
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Cart Item Component
interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdateQuantity }: CartItemCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-3 border border-border rounded-lg"
    >
      <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden mr-3">
        <img 
          src={item.image} 
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </button>
        <button 
          className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartSidebar;
