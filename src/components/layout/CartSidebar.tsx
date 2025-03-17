import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CreditCard,
  Printer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderItemStatus, OrderStatus, Table, TableStatus } from '@/types';
import { useOrderItemsStore } from '@/store/orderitem-store';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useOrderStore } from '@/store/order-store';
import { useTableStore } from '@/store/table-store';
import OrderItemsCart from '../custom/order-items/OrderItemsCart';
import { fetchOrderItems } from '@/services/orderItemsService';

interface CartSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}


const CartSidebar = ({ collapsed, setCollapsed }: CartSidebarProps) => {
  const { orderItems, getTotal, setOrderItems, clearOrderItems, updateOrderItem } = useOrderItemsStore();
  const  { updateOrder } = useOrderStore();
  const [orderId, setOrderId] = useState('');
  const  { updateTable , getTable } = useTableStore();
  const { tableId } = useParams();
  const [currentTable, setCurrentTable] = useState<Table | null>();


  // first run
  useEffect(() => {
    const getOrderItems = async () => {
      const table = await getTable(tableId);
      if(!table) return;
      setCurrentTable(table);
      if(!table?.order){
         setOrderItems([]);
         return;
      };
      setOrderId(table?.order?._id);
      const data = await fetchOrderItems(table?.order?._id);
      setOrderItems(data);
    }
    getOrderItems();

    // Realtime Sync
    // const intervalId = setInterval(getOrderItems, 10000);
    // // Cleanup the interval on component unmount.
    // return () => clearInterval(intervalId);

  }, []);

  const processCheckout = async () => {

    const inKitchenAndNewExist = orderItems.some((orderItem) => orderItem.status === OrderItemStatus.InKitchen || orderItem.status === OrderItemStatus.New);

    if(inKitchenAndNewExist) {
      toast.error('You cannot checkout because there are pending (new and in-kitchen) food items.', {
        duration: 3000,
        style: {
          background: '#f87171',
          color: '#fff',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '4px',
        },
        position: 'top-center',
        dismissible: true
      });
      return;
    }

    // Update Order Status and Total
    const order = {
      _id: currentTable?.order._id,
      customer: null,
      status: OrderStatus.Completed,
      total_amount: Number(getTotal().toFixed(2))
    }
    updateOrder(order);

    // Make table available again
    const table = {
      _id: currentTable?._id,
      status: TableStatus.Available,
      order: null
    }
    updateTable(table);

    // Update statuses 
    orderItems.forEach( async (orderItem) => {
      if(orderItem.status === OrderItemStatus.Cancelled) return;
      orderItem.status = OrderItemStatus.Completed;
      await updateOrderItem(orderItem);
    })

    toast.success('Successfully checkout the order!', {
      duration: 3000,
      style: {
        background: '#4ade80',
        color: '#fff',
        fontWeight: 'bold',
        padding: '16px',
        borderRadius: '4px', 
      },
      position: 'top-center',
      dismissible: true
    });
  }

  const sidebarVariants = {
    expanded: { width: 380, opacity: 1 },
    collapsed: { width: 0, opacity: 0 }
  };

  return (
    <motion.div
      className={cn(
        "h-[calc(100vh-4rem)] border-l border-border bg-white shadow-sm z-20",
        collapsed ? "hidden" : "block"
      )}
      initial="collapsed"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Cart</h2> <span>Table : {currentTable?.table_number}</span>
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
            {orderItems.length === 0 ? (
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
              orderItems.map((item, index) => (
                <OrderItemsCart
                  orderId={orderId}
                  key={item?._id || index}
                  item={item}
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
              <span className="text-gray-500">Tax (0%)</span>
              <span>${(getTotal()).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(getTotal()).toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className="flex items-center justify-center p-3 rounded-lg bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-700 disabled:cursor-not-allowed transition-colors duration-200 btn-hover"
              onClick={() => clearOrderItems()}
              disabled={orderItems.length === 0}
            >
              <Printer className="h-5 w-5 mr-2" />
              <span>Print Receipt</span>
            </button>
            <button
              className="flex items-center justify-center p-3 rounded-lg bg-secondary text-white hover:bg-secondary/90 disabled:bg-gray-100 disabled:text-gray-700 disabled:cursor-not-allowed transition-colors duration-200 btn-hover"
              disabled={orderItems.length === 0 && orderItems.every((item) => item.status === "ready")}
              onClick={processCheckout}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Checkout</span>
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
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


export default CartSidebar;
