import OrderType from "./enums/orderType";
import QueryItem from "./queryParams";

const OrderByOptions: Array<{ label: string; value: string }> = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Manufacturer",
    value: "vendor",
  },
  {
    label: "Pickups",
    value: "category",
  },

];
const OrderTypeOptions: Array<QueryItem> = [
  {
    label: "Asc",
    value: OrderType.Asc,
  },
  {
    label: "Desc",
    value: OrderType.Desc,
  },
];

export default { OrderByOptions, OrderTypeOptions };
