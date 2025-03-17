
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Menu, Order, OrderItem, OrderItemStatus, OrderStatus, OrderType, Table, TableStatus } from '@/types';
import { useOrderItemsStore } from '@/store/orderitem-store';
import { fetchMenus } from '@/services/menuService';
import { fetchCategories } from '@/services/categoryService';
import { useParams } from 'react-router-dom';
import CartSidebar from '@/components/layout/CartSidebar';
import { useCartStore } from '@/store/cart-store';
import { createOrder } from '@/services/orderService';
import { useTableStore } from '@/store/table-store';
import { updateTable } from '@/services/tableService';

const POS = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { orderItems, addOrderItem } = useOrderItemsStore();
  const [ orderId, setOrderId ] = useState('');
  const { getTable } = useTableStore();
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const { tableId } = useParams();
  const { cartCollapsed, setCartCollapsed } = useCartStore();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    (async () => {
      const menuItems = await fetchMenus();
      setMenus(menuItems);

      const categoryItems = await fetchCategories();
      setCategories(categoryItems);
    })()
  }, [])


  useEffect(() => {
    const category = categories.find((cat) => cat._id === selectedCategory);
    const subCategory = categories.find((cat) =>
      cat._children.some((sub) => sub._id === selectedCategory)
    );

    setSubcategories(category?._children.length ? category._children : subCategory?._children || []);
  }, [selectedCategory, setSubcategories, categories]);


  const filteredItems = menus.filter((item) => {
    // Match Category
    const matchesCategory = !selectedCategory || item.category?.some((cat) => cat._id === selectedCategory);

    // Match Search
    const matchesSearch = !searchQuery ||
      [item.name, item.description].some((text) => text.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });



  const createNewOrder = async (table: Table) => {
    const order = await createOrder({
      table: {
        _model: 'table',
        _id: table?._id
      },
      status: OrderStatus.Pending,
      order_type: OrderType.DineIn,
      total_amount: 0,
      customer: null
    });
    return order;
  }

  const updateTableStatus = async (table: Table, order: Order) => {
    await updateTable({
      _id: table?._id,
      status: TableStatus.Occupied,
      order: {
        _model: 'order',
        _id: order._id
      }
    })
  }

  const addNewOrderItem = async (item: OrderItem, orderId) => {
    const menu = {
      _model: 'menu',
      _id: item._id,
      ...item
    }

    const orderItem = {
      order: {
        _model: 'order',
        _id: orderId
      },
      menu,
      status: OrderItemStatus.New,
      price: item.price,
      quantity: 1,
      special_instruction: ''
    }

    addOrderItem(orderItem);
  }

  // If user refresh the page.
  useEffect(() => {
    (async () => {
      if (!orderId) {
        const table = await getTable(tableId);
        setOrderId(table?.order?._id);
      }
    })()
  }, [orderId])

  const addToCart = async (item: OrderItem) => {
    // if it's NOT the 1st time
    if (orderItems.length > 0 && orderId) {
      addNewOrderItem(item, orderId)
      return;
    }


    const table = await getTable(tableId);
    // Step 1
    const order = await createNewOrder(table);
    // Step 2
    updateTableStatus(table, order);
    addNewOrderItem(item, order?._id);
    setOrderId(order?._id)

  }

  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      <div className="flex-1 p-6 overflow-auto">
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
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${selectedCategory === null
              ? 'bg-secondary text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            All Items
          </motion.button>

          {categories && categories.map((category) => (
            <motion.button
              key={category._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category._id)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${selectedCategory === category._id
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                <img
                  src={category.image || import.meta.env.VITE_PLACEHOLDER_IMAGE}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Sub Category */}
        <div className="sub-categories flex space-x-2 overflow-x-auto pb-4 -mx-1 px-1">

          {selectedCategory && subcategories && subcategories.map((category) => (
            <motion.button
              key={category._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category._id)}
              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${selectedCategory === category._id
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                <img
                  src={category.image || import.meta.env.VITE_PLACEHOLDER_IMAGE}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="overflow-y-auto h-[calc(100vh-15rem)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <MenuItem
                key={item._id}
                item={item}
                onAddToCart={() => addToCart(item)}
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
      <CartSidebar
        collapsed={cartCollapsed}
        setCollapsed={setCartCollapsed}
      />
    </div>
  );
};

interface MenuItemProps {
  item: Menu;
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
          src={item.image || import.meta.env.VITE_PLACEHOLDER_IMAGE}
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
