import { readProductDto } from "@/api/types/newProduct/rProductDto";
import userDto from "@/api/types/user/userDto";

interface StateType {
  user: userDto;
  orders: { count: number };
  role: string;
  products: readProductDto[];
}

export default StateType;
