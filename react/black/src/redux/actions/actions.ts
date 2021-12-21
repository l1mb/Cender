import IGroupedProduct from "@/api/types/Products/IGroupedProduct";
import userDto from "@/api/types/user/userDto";
import OrderState from "../types/orders";

export const SET_USER = "SET_USER";
export const SET_COUNT = "SET_COUNT";
export const SET_ROLE = "SET_ROLE";
export const SET_PRODUCTS = "SET_PRODUCTS";

const setUser = (user: userDto): { type: string; payload: userDto } => ({
  type: SET_USER,
  payload: user,
});

const setCount = (
  orders: OrderState
): {
  type: string;
  payload: OrderState;
} => ({
  type: SET_COUNT,
  payload: orders,
});

const setRole = (
  role: string
): {
  type: string;
  payload: string;
} => ({
  type: SET_ROLE,
  payload: role,
});

const setProducts = (
  Products: IGroupedProduct[]
): {
  type: string;
  payload: IGroupedProduct[];
} => ({
  type: SET_PRODUCTS,
  payload: Products,
});

export default { setUser, setCount, setRole, setProducts };
