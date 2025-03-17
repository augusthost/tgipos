
import { createOrder } from '@/services/orderService';
import { fetchTables, updateTable } from '@/services/tableService';
import { useOrderStore } from '@/store/order-store';
import { useTableStore } from '@/store/table-store';
import { Order, OrderStatus, OrderType, Table, TableStatus } from '@/types';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Tables = () => {
  const navigate = useNavigate();

  const { getTables, setTables } = useTableStore();
  const tables = getTables();
  const { addOrder } = useOrderStore();

  useEffect(() => {
    (async () => {
      const menuItems = await fetchTables();
      setTables(menuItems);
    })()
  }, [setTables])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tables</h1>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg btn-hover"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Table
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables && tables.map((table) => (
          <Link to={`/tables/${table._id}`} key={table._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <div className="border-b border-gray-100 p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{table.table_number}</h3>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(table.status)}`}>
                  {getStatusText(table.status)}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Seats</span>
                <span className="font-medium text-gray-900">{table.seats}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm">
                  View Details
                </button>
                <button
                  className={`p-2 rounded-lg text-white text-sm ${table.status === 'available'
                      ? 'bg-secondary hover:bg-secondary/90'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  disabled={table.status !== 'available'}
                >
                  Assign
                </button>
              </div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tables;
