import OrderBy from "./enums/orderBy";
import OrderType from "./enums/orderType";

interface QueryItem {
  label: string;
  value: OrderType | OrderBy | string;
}

export default QueryItem;
