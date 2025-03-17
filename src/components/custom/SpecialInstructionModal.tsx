import { OrderItem, OrderItemStatus } from "@/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateOrderItem } from "@/services/orderItemsService";

type SpecialInstructionModalProps = {
  open: boolean;
  onClose: () => void;
  item: OrderItem;
}

const SpecialInstructionModal = ({ open, onClose, item }: SpecialInstructionModalProps) => {
  const [instruction, setInstruction] = useState("");
  const { mutate: updateOrderItem } = useUpdateOrderItem();

  useEffect(() => {
    setInstruction(item.special_instruction);
  }, [item.special_instruction]);

  const onSubmit = async (instruction: string) => {
     const updatedItem: Partial<OrderItem> = { 
      ...item, 
      special_instruction: instruction
    };

     await updateOrderItem(updatedItem,{
      onSuccess: () => {
        console.log('Order item updated successfully!');
      },
      onError: (err) => {
          console.error('Error updating order item:', err);
      }
     });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Special Instruction</DialogTitle>
            <DialogDescription>Add any special instructions for this order item.</DialogDescription>
          </DialogHeader>
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
            <Button variant="default" type="button" onClick={onClose}>Cancel</Button>
            <Button
              variant="secondary"
              type="submit"
              onClick={() => {
                onSubmit(instruction);
                onClose();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialInstructionModal