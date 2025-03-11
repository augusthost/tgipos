
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter } from 'lucide-react';
import { categories, menuItems } from '@/data/mockData';
import { MenuItem as MenuItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';

const POS = () => {
  const [ selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();
  
  // Filter menu items based on category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">Point of Sale</h2>
          <div className="text-sm text-gray-500">
            {filteredItems.length} items available
          </div>
        </div>
        
        <div className="relative w-64">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-4 -mx-1 px-1">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-secondary text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Items
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            {category.name}
          </motion.button>
        ))}
      </div>
      
      <div className="overflow-y-auto h-[70vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-4">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={() => addItem(item)}
            />
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center h-64 text-gray-400">
            <Filter className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg">No items found</p>
            <p className="text-sm">Try changing your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: () => void;
}

const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={onAddToCart}
      className="bg-white cursor-pointer hover:border-blue-500 h-64 rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium">{item.name}</h3>        
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default POS;
