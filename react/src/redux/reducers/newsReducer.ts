import IBasicProduct from "@/api/types/products/IBasicProduct";
import { SET_PRODUCTS } from "../actions/actions";

interface ProductsAction {
  type: string;
  payload: IBasicProduct[];
}

const ProductsReducer = (state: IBasicProduct[] = [], action: ProductsAction): IBasicProduct[] => {
  switch (action.type) {
    case SET_PRODUCTS: {
      if (action.payload) {
        return action.payload;
      }
      return [];
    }
    default:
      return state;
  }
};

export default ProductsReducer;
