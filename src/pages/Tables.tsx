
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

// Mock tables data
const tables = [
  { id: 1, name: 'Table 1', seats: 2, status: 'available' },
  { id: 2, name: 'Table 2', seats: 4, status: 'occupied' },
  { id: 3, name: 'Table 3', seats: 6, status: 'available' },
  { id: 4, name: 'Table 4', seats: 2, status: 'reserved' },
  { id: 5, name: 'Table 5', seats: 4, status: 'available' },
  { id: 6, name: 'Table 6', seats: 8, status: 'occupied' },
  { id: 7, name: 'Table 7', seats: 2, status: 'available' },
  { id: 8, name: 'Table 8', seats: 4, status: 'available' },
  { id: 9, name: 'Table 9', seats: 6, status: 'reserved' },
  { id: 10, name: 'Table 10', seats: 2, status: 'available' },
  { id: 11, name: 'Table 11', seats: 4, status: 'available' },
  { id: 12, name: 'Table 12', seats: 4, status: 'occupied' },
];

const Tables = () => {
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
    <div className="space-y-6">
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
        {tables.map((table) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <div className="border-b border-gray-100 p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{table.name}</h3>
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
                  className={`p-2 rounded-lg text-white text-sm ${
                    table.status === 'available' 
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
        ))}
      </div>
    </div>
  );
};

export default Tables;
