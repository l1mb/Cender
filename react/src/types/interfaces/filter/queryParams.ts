import OrderType from "@/api/types/Products/enums/orderType";

interface QueryParams {
  orderby: string | undefined;
  type: OrderType | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  mnfrId: number | undefined;
  shape: string | undefined;
  pickUp: number | undefined;
}

export default QueryParams;
