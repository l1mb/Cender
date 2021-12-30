import Platforms from "@/api/types/Products/enums/platfrom";

interface OrderItem {
  id: number;
  name: string;
  platform: Platforms;
  orderDate: Date;
  amount: number;
  price: number;
  selected?: boolean;
}

export default OrderItem;
