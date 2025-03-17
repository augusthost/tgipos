import { Order, OrderItem, OrderItemStatus } from "@/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { useFetchOrderItems } from "@/services/orderItemsService";

type OrderDetailsProps = {
  open: boolean;
  onClose?: () => void;
  order: Order;
}

const OrderDetails = ({ open, onClose, order }: OrderDetailsProps) => {

  if (!open || !order) return null;

    const { data: orderItems, isLoading, error } = useFetchOrderItems(order?._id);

  const onSubmit = () => {

  }


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold">Order Details</DialogTitle>
            <DialogDescription>ID : {order._id}</DialogDescription>
          </DialogHeader>
          {orderItems.length === 0 && <div className="text-center">No order items for this order.</div>}
          {orderItems.length > 0 && <div className="space-y-2">
            {orderItems.map((item) => {
              return (
                <div key={item._id} className="flex">
                  <div className="w-[50%]">{item.menu.name} {item.status === OrderItemStatus.Cancelled?<span className="ml-2 text-xs bg-gray-100 text-gray-600">Cancelled</span>:''}</div>
                  <div className="w-[20%] text-right">{item.quantity}</div>
                  <div className="w-[30%] text-right">${item.price}</div>
                </div>
              )
            })}
            <div className="text-right flex w-full mt-2 pt-2 border-t">
              <div className="w-[50%]"></div>
              <div className="w-[50%] text-right">Total : ${order?.total_amount}</div>
            </div>
          </div>}
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="default" type="button" onClick={onClose}>Cancel</Button>
            <Button
              variant="secondary"
              type="submit"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails