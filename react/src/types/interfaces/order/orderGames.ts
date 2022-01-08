import IBasicProduct from "@/api/types/Products/IBasicProduct";
import BackendOutOrderEntity from "./backOutEntity";

interface OrderProduct {
  item: BackendOutOrderEntity;
  Products: IBasicProduct;
}

export default OrderProduct;
