import { Order, OrderItem, OrderItemStatus } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { useFetchOrderItems } from "@/services/orderItemsService";
import OrderItemsLoop from "./OrderItemsLoop";

type OrderDetailsProps = {
  open: boolean;
  onClose?: () => void;
  order: Order;
};

const OrderDetails = ({ open, onClose, order }: OrderDetailsProps) => {
  const {
    data: orderItems,
    isLoading,
    error,
  } = useFetchOrderItems(order?._id, true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = () => {};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold">
              Order Details
            </DialogTitle>
            <DialogDescription>ID : {order._id}</DialogDescription>
          </DialogHeader>
          <OrderItemsLoop orderItems={orderItems} />
          <div className="text-right flex w-full mt-2 pt-2 border-t">
            <div className="w-[50%]"></div>
            <div className="w-[50%] text-right">
              Total : ${order?.total_amount}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="default" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="secondary" type="submit" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
