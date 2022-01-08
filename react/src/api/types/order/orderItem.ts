import Platforms from "@/api/types/Products/enums/platfrom";

interface OrderItem {
  id: number;
  userId: string;
  productId: number;
  count: number;
  orderDate: string;
  status: string;
  selected?: boolean;
}

export default OrderItem;
