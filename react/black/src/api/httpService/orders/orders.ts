import endpoints from "@/api/endpoints";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import postOrderEntity from "@/types/interfaces/order/postOrderEntity";
import BackendOrderUpdateEntity from "@/types/interfaces/order/backendOrderUpdateEntity";
import BackendOutOrderEntity from "@/types/interfaces/order/backOutEntity";
import OrderProduct from "@/types/interfaces/order/orderProducts";
import zipOrders from "@/helpers/basic/zipOrders";
import orderTypes from "@/types/constants/orders/orderTypes";
import getOptions from "../tokenedOptions";

const apiGetOrders = async (orderId?: number): Promise<BackendOutOrderEntity[] | null> => {
  const tdata = await fetch(`${endpoints.orders}`, getOptions("GET", true, orderId));

  if (tdata.status === 200) {
    return tdata.json();
  }
  return null;
};

const apiGetOrderProducts = async (productId?: number): Promise<IBasicProduct> => {
  const tdata = await fetch(`${`${endpoints.getProductsById}/${productId}`}`, getOptions("GET", false));

  return tdata.json();
};

const getCompletedOrders = async (): Promise<BackendOutOrderEntity[] | null> => {
  const rawOrders = await fetch(`${endpoints.ordersCompleted}`, getOptions("GET", true));
  if (rawOrders.status !== 200) {
    return null;
  }

  return rawOrders.json();
};

const getOrders = async (type?: string): Promise<BackendOutOrderEntity[] | null> => {
  const data = type === orderTypes.completed ? await getCompletedOrders() : await apiGetOrders();

  return data;
};

const getProducts = async (type?: string) => {
  const data = await getOrders(type);

  if (data) {
    return Promise.all(data.map((e) => apiGetOrderProducts(e.productId)));
  }
  return null;
};

const productsWithOrders = async (type?: string) => {
  const data = await getOrders(type);
  const newproducts = await getProducts(type);

  return {
    data,
    newproducts,
  };
};

const getZippedOrders = async (type?: string): Promise<OrderProduct[]> => {
  const orders = await productsWithOrders(type);
  return zipOrders(orders.newproducts, orders.data);
};

const postOrder = async (prop: postOrderEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("POST", true, prop));

  return data;
};

const deleteOrders = async (prop: BackendOrderUpdateEntity[]): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("DELETE", true, prop));

  return data;
};

const completeOrders = async (): Promise<Response> => {
  const data = await fetch(`${endpoints.ordersComplete}`, getOptions("POST", true));
  return data;
};

const updateOrder = async (body: BackendOrderUpdateEntity): Promise<Response> => {
  const data = await fetch(`${endpoints.orders}`, getOptions("PUT", true, body));
  return data;
};

export default {
  apiGetOrders,
  apiGetOrderProducts,
  getZippedOrders,
  postOrder,
  deleteOrders,
  completeOrders,
  updateOrder,
  getCompletedOrders,
};
