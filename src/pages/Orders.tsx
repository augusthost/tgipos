
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Printer, Clock, CheckCircle, XCircle } from 'lucide-react';
import OrderDetails from '@/components/custom/orders/OrderDetails';
import { useFetchOrders } from '@/services/orderService';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {data: orders, isLoading, error} = useFetchOrders();


  if(isLoading){
    return <p>Loading...</p>;
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery
      ? order._id.toLowerCase().includes(searchQuery.toLowerCase()) 
      // || order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter
      ? order.status === statusFilter
      : true;
    
    return matchesSearch && matchesStatus;
  });

  const openOrderDetails = (order) => {
    setSelectedOrder(order); // Set the selected order
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null); // Clear the selected order
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1.5" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1.5" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 mr-1.5" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Orders</h1>
        
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-4 -mx-1 px-1">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatusFilter(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
            statusFilter === null
              ? 'bg-secondary text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Orders
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
            statusFilter === 'pending'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          Pending
          </span>
        </motion.button>
        
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatusFilter('completed')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
            statusFilter === 'completed'
              ? 'bg-green-500 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Completed
          </span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setStatusFilter('cancelled')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
            statusFilter === 'cancelled'
              ? 'bg-red-500 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center">
            <XCircle className="h-4 w-4 mr-1.5" />
            Cancelled
          </span>
        </motion.button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <motion.tr 
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order?.customer?.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(order._created * 1000).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order?.table ? order?.table?.table_number : 'N/A'}</div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items}</div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${order?.total_amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                      <span className="flex items-center">
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openOrderDetails(order)} className="text-secondary hover:text-secondary/80 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Printer className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={8}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails onClose={closeOrderDetails} open={!!selectedOrder} order={selectedOrder} />
      )}
    </div>
  );
};

export default Orders;
