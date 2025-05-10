import { useFetchOrderItems } from "@/services/orderItemsService";
import { Order } from "@/types";
import OrderItemsLoop from "./OrderItemsLoop";

const PrintOrderDetails = ({ order }: { order: Order }) => {
  const {
    data: orderItems,
    isLoading,
    error,
  } = useFetchOrderItems(order?._id, true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="print-box w-0 h-0 invisible opacity-0 bg-white">
      <div className="max-w-[400px] w-full p-4">
        <h2 className="text-center font-bold text-xl my-4">TGI POS</h2>
        <hr className="my-4" />
        <div className="mb-4 text-sm">ID : {order?._id}</div>
        <hr className="my-4" />
        <OrderItemsLoop orderItems={orderItems} />
        <div className="flex justify-end w-full mt-2 pt-2 border-t">
          <div>Subtotal :</div>{" "}
          <div className="w-[50px] text-right">${order?.total_amount}</div>
        </div>
        <div className="flex justify-end w-full mt-2 pt-2 border-t">
          <div>Tax :</div> <div className="w-[50px] text-right">$0</div>
        </div>
        <div className="flex justify-end  w-full mt-2 pt-2 border-t">
          <div>Total :</div>{" "}
          <div className="w-[50px] text-right">
            $<b>{order?.total_amount}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintOrderDetails;
