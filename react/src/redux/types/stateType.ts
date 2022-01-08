import { readProductDto } from "@/api/types/newProduct/rProductDto";
import userDto from "@/api/types/user/userDto";
import PreOrderState from "./orders";

interface StateType {
  user: userDto;
  orders: PreOrderState;
  role: string;
  products: readProductDto[];
}

export default StateType;
