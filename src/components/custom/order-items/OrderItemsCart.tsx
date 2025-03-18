import { motion } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ChefHatIcon,
  NotebookIcon
} from 'lucide-react';
import { OrderItem, OrderItemStatus, Table, TableStatus } from '@/types';
import { useState } from 'react';
import SpecialInstructionModal from '@/components/custom/SpecialInstructionModal';
import { useParams } from 'react-router-dom';
import { useFetchTable, useUpdateTable } from '@/services/tableService';
import { useDeleteOrder } from '@/services/orderService';
import { useFetchOrderItems, useDeleteOrderItem, useUpdateOrderItem } from '@/services/orderItemsService';
import { getStatusColor } from '@/lib/helper';

// Cart Item Component
interface OrderItemsCartProps {
  item: OrderItem;
  orderId: string;
}


const OrderItemsCart = ({ item, orderId }: OrderItemsCartProps) => {

  const [openSpecialInstruction, setOpenSpecialInstruction] = useState(false);
  const { tableId } = useParams();
  const { data: table } = useFetchTable(tableId);
  const { data: orderItems, isLoading, error } = useFetchOrderItems(table?.order?._id, !!table?.order?._id);
  const { mutate: updateTable } = useUpdateTable();
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateOrderItem } = useUpdateOrderItem();
  const { mutate: deleteOrderItem } = useDeleteOrderItem();

  const removeFromCart = (id: string, orderId: string) => {
    if (orderItems.length === 1) {
      updateTable({
        _id: tableId,
        status: TableStatus.Available,
        order: null
      })
      deleteOrder(orderId);
    }

    deleteOrderItem(id)
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
      className={`p-3 border border-border rounded-lg relative ${item.special_instruction && 'pb-6'}`}
    >
      <span className={`text-sm border px-2 py-[0.01rem] rounded-full text-gray-600 bg-white absolute top-2 -left-2 ${getStatusColor(item.status)}`}>{item.status}</span>
      <div className="flex gap-2">
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

        <div className='flex items-center'>
          {(item.status === 'new' || item.status === 'in-kitchen') && (<button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => updateOrderItem({ ...item, quantity: Math.max(1, item.quantity - 1) })}
          >
            <Minus className="h-4 w-4" />
          </button>)}

          <span className="w-8 text-center text-sm">{item.quantity}</span>

          {(item.status === 'new' || item.status === 'in-kitchen') && (<button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => updateOrderItem({ ...item, quantity: Math.max(1, item.quantity + 1) })}
          >
            <Plus className="h-4 w-4" />
          </button>)}

          <button
            className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
            onClick={() => removeFromCart(item?._id, orderId)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {<div className='flex items-center justify-between gap-2 mb-2'>
        {item.status === 'new' && <button
          onClick={() => setOpenSpecialInstruction(true)}
          className="w-full text-xs text-gray-700 hover:text-gray-900"
          aria-label="Instruction"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex gap-2 items-center"
          >
            <NotebookIcon className="h-4 w-4" /> <span>Note</span>
          </motion.span>
        </button>}

        {(['new','cancelled'].includes(item.status)) && <button
          onClick={() => setToKitchen(item)}
          className="w-full text-xs text-gray-700 hover:text-gray-900"
          aria-label="Instruction"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex gap-2 items-center justify-end"
          >
            <ChefHatIcon className="h-4 w-4" /> <span>Send to kitchen</span>
          </motion.span>
        </button>}

      </div>}
      <SpecialInstructionModal
        open={openSpecialInstruction}
        onClose={() => setOpenSpecialInstruction(false)}
        item={item}
      />
      {item.special_instruction && <span className='text-xs text-gray-400 absolute bottom-2 left-3'>{item.special_instruction}</span>}
    </motion.div>
  );
};


export default OrderItemsCart