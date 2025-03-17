
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Search, Edit, Trash } from 'lucide-react';
import { fetchMenus } from '@/services/menuService';

const FoodMenus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [menus, setMenus] = useState([]);

  useEffect(()=>{
    (async()=>{
      const menuItems = await fetchMenus();
      setMenus(menuItems);
    })()
  },[])
  
  const filteredItems = menus.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Food Menus</h1>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg btn-hover"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Item
        </motion.button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-medium">All Menu Items</h2>
          
          <div className="relative w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems && filteredItems.map((item) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image || import.meta.env.VITE_PLACEHOLDER_IMAGE} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-secondary hover:text-secondary/80 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={4}>
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodMenus;
