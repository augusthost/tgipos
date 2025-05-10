import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Search, Check, X } from "lucide-react";
import {
  useFetchKitchenOrderItems,
  useUpdateOrderItem,
} from "@/services/orderItemsService";
import { OrderItemStatus } from "@/types";
import { toast } from "sonner";
import { getImageUrl, getStatusColor } from "@/lib/helper";
import OrderItemStatusBadge from "@/components/custom/order-items/OrderItemStatusBadge";

const Kitchen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: orderItems, isLoading, error } = useFetchKitchenOrderItems();
  const { mutate: updateOrderItem } = useUpdateOrderItem();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredItems =
    orderItems.length > 0
      ? orderItems.filter(
          (item) =>
            item?.menu?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item?.menu?.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        )
      : [];

  const updateStatus = async (item, status: string) => {
    item.status = status;
    updateOrderItem(item);

    if (status === "cancel") {
      toast.error(`Canceled ${item.menu.name}`, {
        duration: 3000,
        style: {
          background: "#f87171",
          color: "#fff",
          fontWeight: "bold",
          padding: "16px",
          borderRadius: "4px",
        },
        position: "top-center",
        dismissible: true,
      });
      return;
    }

    toast.success(`Updated ${item.menu.name} status to ${status}`, {
      duration: 3000,
      style: {
        background: "#4ade80",
        color: "#fff",
        fontWeight: "bold",
        padding: "16px",
        borderRadius: "4px",
      },
      position: "top-center",
      dismissible: true,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Kitchen Orders</h1>

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
          <h2 className="font-medium">Orders</h2>

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instruction
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems &&
                filteredItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={getImageUrl(item?.menu?.image)}
                            alt={item?.menu?.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item?.menu?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {item?.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {item?.order?.table?.table_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderItemStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.special_instruction}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* Add toggleable buttons for in-kitchen, ready, and cancelled */}
                      {item.status === OrderItemStatus.InKitchen && (
                        <div className="flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              updateStatus(item, OrderItemStatus.Ready)
                            }
                            className="flex items-center px-2 py-1 bg-green-500 text-white rounded-lg btn-hover"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            <span>Ready</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              updateStatus(item, OrderItemStatus.Cancelled)
                            }
                            className="flex items-center px-2 py-1 bg-red-500 text-white rounded-lg btn-hover"
                          >
                            <X className="h-4 w-4 mr-1" />
                            <span>Cancel</span>
                          </motion.button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-gray-500"
                    colSpan={4}
                  >
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

export default Kitchen;
