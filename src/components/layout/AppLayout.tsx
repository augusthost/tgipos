
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import CartSidebar from './CartSidebar';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cartCollapsed, setCartCollapsed] = useState(false);
  const { cartItems } = useCart();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="h-16 border-b border-border bg-white shadow-sm px-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Food House</h1>
          
          <button
            onClick={() => setCartCollapsed(false)}
            className="p-2 rounded-full hover:bg-gray-100 relative btn-hover"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {cartItems.length}
            </motion.span>
          </button>
        </div>
        
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      
      <CartSidebar 
        collapsed={cartCollapsed} 
        setCollapsed={setCartCollapsed} 
      />
    </div>
  );
};

export default AppLayout;
