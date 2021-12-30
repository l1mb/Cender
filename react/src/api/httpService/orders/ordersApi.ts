import endpoints from "@/api/endpoints";
import BackendOrderUpdateEntity from "@/api/types/order/backendOrderUpdateEntity";
import OrderProduct from "@/types/interfaces/order/orderProduct";
import postOrderEntity from "@/types/interfaces/order/postOrderEntity";
import getOptions from "../tokenedOptions";

const getOrders = async (): Promise<OrderProduct[] | null> => {
  const tdata = await fetch(`${endpoints.orders}`, getOptions("GET", true));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};

const postOrder = async (prop: postOrderEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("POST", true, prop));

  return data;
};

const deleteOrders = async (prop: { keys: number[] }): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("DELETE", true, prop));

  return data;
};

const completeOrders = async (prop: { keys: number[] }): Promise<Response> => {
  const data = await fetch(`${endpoints.completeOrders}`, getOptions("POST", true, prop));
  return data;
};

const updateOrder = async (body: BackendOrderUpdateEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("PUT", true, body));
  return data;
};

export default {
  postOrder,
  deleteOrders,
  updateOrder,
  getOrders,
  completeOrders,
};
