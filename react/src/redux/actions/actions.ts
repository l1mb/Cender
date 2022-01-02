import userDto from "@/api/types/user/userDto";
import { updateProductDto } from "@/types/dtos/product/productDto";
import PreOrderState from "../types/orders";

export const SET_USER = "SET_USER";
export const SET_COUNT = "SET_COUNT";
export const SET_ROLE = "SET_ROLE";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_MNFRS = "SET_MNFRS";
export const SET_ORDER = "SET_ORDER";

const setUser = (user: userDto): { type: string; payload: userDto } => ({
  type: SET_USER,
  payload: user,
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
  Products: updateProductDto[]
): {
  type: string;
  payload: updateProductDto[];
} => ({
  type: SET_PRODUCTS,
  payload: Products,
});

const setOrderItems = (
  order: PreOrderState
): {
  type: string;
  payload: PreOrderState;
} => ({
  type: SET_ORDER,
  payload: order,
});

export default { setUser, setOrderItems, setRole, setProducts };
