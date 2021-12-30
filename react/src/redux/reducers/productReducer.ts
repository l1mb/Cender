import { readProductDto } from "@/api/types/newProduct/rProductDto";
import IBasicProduct from "@/api/types/products/IBasicProduct";
import { SET_PRODUCTS } from "../actions/actions";

interface ProductsAction {
  type: string;
  payload: readProductDto[];
}

function ProductsReducer(state: readProductDto[] = [], action: ProductsAction): readProductDto[] {
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
}

export default ProductsReducer;
