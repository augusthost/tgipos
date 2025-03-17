
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { ShoppingCart } from 'lucide-react';
import { useOrderItemsStore } from '@/store/orderitem-store';
import { useCartStore } from '@/store/cart-store';

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { orderItems } = useOrderItemsStore();
  const { cartCollapsed, setCartCollapsed } = useCartStore();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="h-16 border-b border-border bg-white shadow-sm px-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">TGI Pos</h1>
          
          <button
            onClick={() => setCartCollapsed(!cartCollapsed)}
            className="p-2 rounded-full hover:bg-gray-100 relative btn-hover"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {orderItems.length}
            </motion.span>
          </button>
        </div>
        
        <div>
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AppLayout;
