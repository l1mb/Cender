import orders from "@/api/httpService/orders/orders";
import { Dispatch } from "@reduxjs/toolkit";
import actions from "../actions";

const setCountDispatch =
  () =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: { count: number };
    }>
  ): Promise<void> => {
    const response = await orders.apiGetOrders();
    const count = response ? response.length : 0;

    dispatch(actions.setCount({ count }));
  };
export default setCountDispatch;
