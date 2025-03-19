import { motion } from 'framer-motion';
import {
  Trash2
} from 'lucide-react';
import { OrderItem, TableStatus } from '@/types';
import { useState } from 'react';
import OrderItemModal from '@/components/custom/OrderItemModal';
import { useParams } from 'react-router-dom';
import { useFetchTable, useUpdateTable } from '@/services/tableService';
import { useDeleteOrder } from '@/services/orderService';
import { useFetchOrderItems, useDeleteOrderItem } from '@/services/orderItemsService';
import { getImageUrl, getStatusColor } from '@/lib/helper';
import OrderItemStatusBadge from './OrderItemStatusBadge';

// Cart Item Component
interface OrderItemsCartProps {
  item: OrderItem;
  orderId: string;
}


const OrderItemsCart = ({ item, orderId }: OrderItemsCartProps) => {

  const [openOrderItemModal, setOpenOrderItemModal] = useState(false);
  const { tableId } = useParams();
  const { data: table } = useFetchTable(tableId);
  const { data: orderItems, isLoading, error } = useFetchOrderItems(table?.order?._id, !!table?.order?._id);
  const { mutate: updateTable } = useUpdateTable();
  const { mutate: deleteOrder } = useDeleteOrder();
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

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        onClick={() => setOpenOrderItemModal(true)}
        className={`p-3 border border-border rounded-lg hover:border-blue-500 active:border-blue-500 cursor-pointer relative ${item.special_instruction && 'pb-6'}`}
      >
        <span className='absolute top-2 -left-2'>
          <OrderItemStatusBadge status={item.status} />
        </span>
        <div className="flex gap-2">
          <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden mr-3">
            <img
              src={getImageUrl(item?.menu?.image)}
              alt={item?.menu?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{item?.menu?.name}</h4>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>

          <div className='flex items-center'>
            <span className="w-8 text-center text-sm">{item.quantity}</span>

            <button
              className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
              onClick={(e) =>{
                e.stopPropagation(); 
                removeFromCart(item?._id, orderId)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {item.special_instruction && <span className='text-xs text-gray-400 absolute bottom-2 left-3'>{item.special_instruction}</span>}
      </motion.div>
      <OrderItemModal
        open={openOrderItemModal}
        onClose={() => setOpenOrderItemModal(false)}
        item={item}
      />
    </>
  );
};


export default OrderItemsCart