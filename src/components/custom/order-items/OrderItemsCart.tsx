import { motion } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ChefHatIcon,
  NotebookIcon
} from 'lucide-react';
import { OrderItem, OrderItemStatus, Table, TableStatus } from '@/types';
import { useOrderItemsStore } from '@/store/orderitem-store';
import { useEffect, useState } from 'react';
import SpecialInstructionModal from '@/components/custom/SpecialInstructionModal';
import { useParams } from 'react-router-dom';
import { useTableStore } from '@/store/table-store';
import { updateTable } from '@/services/tableService';
import { deleteOrder } from '@/services/orderService';

// Cart Item Component
interface OrderItemsCartProps {
  item: OrderItem;
}


const OrderItemsCart = ({ item }: OrderItemsCartProps) => {

  const [openSpecialInstruction, setOpenSpecialInstruction] = useState(false);
  const { orderItems, updateOrderItem, removeOrderItem, updateQuantity, orderId } = useOrderItemsStore();
  const { tableId } = useParams();


  const removeFromCart = (id: string) => {
    if (orderItems.length === 1) {
      updateTable({
        _id: tableId,
        status: TableStatus.Available,
        order: null
      })
      deleteOrder(orderId);
    }

    removeOrderItem(id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'border-blue-500';
      case 'in-kitchen':
        return 'border-yellow-500';
      case 'ready':
        return 'border-green-500';
      case 'completed':
        return 'bg-gray-800 text-white';
      default:
        return 'border-gray-100';
    }
  }

  const setToKitchen = async (orderItem: OrderItem) => {
    orderItem.status = OrderItemStatus.InKitchen;
    updateOrderItem(orderItem);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center p-3 border border-border rounded-lg relative ${item.special_instruction && 'pb-6'}`}
    >
      <span className={`text-sm border px-2 py-[0.01rem] rounded-full text-gray-600 bg-white absolute top-2 -left-2 ${getStatusColor(item.status)}`}>{item.status}</span>
      <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden mr-3">
        <img
          src={item?.menu?.image || import.meta.env.VITE_PLACEHOLDER_IMAGE}
          alt={item?.menu?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item?.menu?.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      <div>


        <div className='flex items-center'>
          {(item.status === 'new' || item.status === 'in-kitchen') && (<button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => updateQuantity(item?._id, Math.max(1, item.quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>)}

          <span className="w-8 text-center text-sm">{item.quantity}</span>

          {(item.status === 'new' || item.status === 'in-kitchen') && (<button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => updateQuantity(item?._id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>)}
          
          <button
            className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
            onClick={() => removeFromCart(item?._id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {(item.status === 'new' || item.status === 'in-kitchen') && <div className='flex items-center justify-end gap-2'>
          <button
            onClick={() => setOpenSpecialInstruction(true)}
            className="p-1 rounded-full flex gap-2 hover:bg-gray-100 text-xs btn-hover"
            aria-label="Instruction"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <NotebookIcon className="h-4 w-4" />
            </motion.span>
          </button>
          <button
            onClick={() => setToKitchen(item)}
            className="p-1 rounded-full flex gap-2 hover:bg-gray-100 text-xs btn-hover"
            aria-label="Instruction"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <ChefHatIcon className="h-4 w-4" />
            </motion.span>
          </button>
        </div>}

      </div>
      <SpecialInstructionModal
        open={openSpecialInstruction}
        onClose={() => setOpenSpecialInstruction(false)}
        item={item}
      />
      {item.special_instruction && <span className='text-xs text-gray-400 absolute bottom-2 left-2'>{item.special_instruction}</span>}
    </motion.div>
  );
};


export default OrderItemsCart