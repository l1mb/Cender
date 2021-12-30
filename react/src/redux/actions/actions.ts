import { readProductDto } from "@/api/types/newProduct/rProductDto";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import userDto from "@/api/types/user/userDto";
import mnfrReadDto from "@/types/interfaces/news/nmfrs";
import OrderState from "../types/orders";

export const SET_USER = "SET_USER";
export const SET_COUNT = "SET_COUNT";
export const SET_ROLE = "SET_ROLE";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_MNFRS = "SET_MNFRS";

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
  Products: readProductDto[]
): {
  type: string;
  payload: readProductDto[];
} => ({
  type: SET_PRODUCTS,
  payload: Products,
});

const setMnfrs = (
  mnfrs: mnfrReadDto[]
): {
  type: string;
  payload: mnfrReadDto[];
} => ({
  type: SET_MNFRS,
  payload: mnfrs,
});

export default { setUser, setCount, setRole, setProducts, setMnfrs };
