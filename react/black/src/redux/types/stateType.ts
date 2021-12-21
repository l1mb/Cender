import IGroupedProduct from "@/api/types/Products/IGroupedProduct";
import userDto from "@/api/types/user/userDto";

interface StateType {
  user: userDto;
  orders: { count: number };
  role: string;
  Products: IGroupedProduct[];
}

export default StateType;
