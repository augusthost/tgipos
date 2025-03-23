import { OrderItem, OrderItemStatus } from "@/types";
import React from "react";

const OrderItemsLoop = ({ orderItems }: { orderItems: OrderItem[] }) => {
  return (
    <>
      {orderItems.length === 0 && (
        <div className="text-center">No order items for this order.</div>
      )}
      {orderItems.length > 0 && (
        <div className="space-y-2">
          {orderItems.map((item) => {
            return (
              <div key={item._id} className="flex">
                <div className="w-[50%]">
                  {item.menu.name}{" "}
                  {item.status === OrderItemStatus.Cancelled ? (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600">
                      Cancelled
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-[20%] text-right">{item.quantity}</div>
                <div className="w-[30%] text-right">${item.price}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default OrderItemsLoop;
