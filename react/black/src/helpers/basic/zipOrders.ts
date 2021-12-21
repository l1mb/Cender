import IBasicProduct from "@/api/types/Products/IBasicProduct";
import BackendOutOrderEntity from "@/types/interfaces/order/backOutEntity";
import OrderProduct from "@/types/interfaces/order/orderProducts";

const zipOrders = (newProducts: IBasicProduct[] | null, data: BackendOutOrderEntity[] | null): OrderProduct[] => {
  const zipped: OrderProduct[] = [];

  if (newProducts && data) {
    for (let i = 0; i < data.length; i++) {
      zipped.push({
        item: data[i],
        Products: newProducts[i],
      });
    }
  }

  return zipped;
};

export default zipOrders;
