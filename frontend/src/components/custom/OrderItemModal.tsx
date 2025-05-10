import { OrderItem, OrderItemStatus } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateOrderItem } from "@/services/orderItemsService";
import { ChefHatIcon, Minus, Plus, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp } from "../motions/FadeInUp";
import { ScaleIn } from "../motions/ScaleIn";
import OrderItemStatusBadge from "./order-items/OrderItemStatusBadge";

type OrderItemModalProps = {
  open: boolean;
  onClose: () => void;
  item: OrderItem;
};

const OrderItemModal = ({ open, onClose, item }: OrderItemModalProps) => {
  const [instruction, setInstruction] = useState("");
  const { mutate: updateOrderItem } = useUpdateOrderItem();

  useEffect(() => {
    setInstruction(item.special_instruction);
  }, [item.special_instruction]);

  const onSubmit = async (instruction: string) => {
    const updatedItem: Partial<OrderItem> = {
      ...item,
      special_instruction: instruction,
    };

    await updateOrderItem(updatedItem);
  };

  const setToKitchen = async (orderItem: OrderItem) => {
    orderItem.status = OrderItemStatus.InKitchen;
    updateOrderItem(orderItem);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex justify-end mb-4">
            <X
              className="h-6 w-6 cursor-pointer hover:bg-gray-100 rounded-full"
              onClick={onClose}
            />
          </div>
          <DialogHeader>
            <FadeInUp as="span">
              <DialogTitle className="text-lg font-semibold flex justify-between">
                <span>{item?.menu?.name}</span>{" "}
                <span>${item?.price * item?.quantity}</span>
              </DialogTitle>
            </FadeInUp>
          </DialogHeader>

          <div className="flex my-4 justify-between gap-2">
            <ScaleIn className="w-full flex items-center">
              {(item.status === "new" || item.status === "in-kitchen") && (
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() =>
                    updateOrderItem({
                      ...item,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  }
                >
                  <Minus className="h-6 w-6" />
                </button>
              )}
              {["ready", "cancelled"].includes(item.status) && (
                <span>Qty: </span>
              )}{" "}
              <span className="w-12 text-center text-lg">{item.quantity}</span>
              {(item.status === "new" || item.status === "in-kitchen") && (
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() =>
                    updateOrderItem({
                      ...item,
                      quantity: Math.max(1, item.quantity + 1),
                    })
                  }
                >
                  <Plus className="h-6 w-6" />
                </button>
              )}
            </ScaleIn>

            <ScaleIn className="w-full flex items-center justify-end">
              {["in-kitchen", "ready", "cancelled"].includes(item.status) && (
                <OrderItemStatusBadge status={item.status} />
              )}
              {["new", "cancelled"].includes(item.status) && (
                <button
                  onClick={() => setToKitchen(item)}
                  className="flex gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded"
                  aria-label="Instruction"
                >
                  <ChefHatIcon className="h-6 w-6" />{" "}
                  <span>Send to kitchen</span>
                </button>
              )}
            </ScaleIn>
          </div>

          {["new", "in-kitchen"].includes(item.status) && (
            <>
              <Textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="mt-2"
                placeholder="Enter special instructions..."
                rows={4}
                maxLength={100}
                required
              />
              <div className="mt-4 flex justify-end space-x-2">
                {instruction && (
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={() => {
                      onSubmit(instruction);
                      onClose();
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderItemModal;
