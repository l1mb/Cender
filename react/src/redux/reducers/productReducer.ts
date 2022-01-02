import { updateProductDto } from "@/types/dtos/product/productDto";
import { SET_PRODUCTS } from "../actions/actions";

interface ProductsAction {
  type: string;
  payload: updateProductDto[];
}

function ProductsReducer(state: updateProductDto[] = [], action: ProductsAction): updateProductDto[] {
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
