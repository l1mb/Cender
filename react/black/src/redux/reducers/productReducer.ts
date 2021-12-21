import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import { SET_PRODUCTS } from "../actions/actions";

interface ProductsAction {
  type: string;
  payload: IGroupedProduct[];
}

const ProductsReducer = (state: IGroupedProduct[] = [], action: ProductsAction): IGroupedProduct[] => {
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
