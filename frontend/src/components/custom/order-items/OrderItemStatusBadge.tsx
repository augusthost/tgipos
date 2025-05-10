import { getStatusColor } from "@/lib/helper";

const OrderItemStatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`text-sm border px-2 py-[0.01rem] rounded-full text-gray-600 bg-white ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
};

export default OrderItemStatusBadge;
