import { Dispatch } from "@reduxjs/toolkit";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import QueryParams from "@/types/interfaces/filter/queryParams";
import actions from "../actions";
import ProductActions from "../manufacturers/newsActionTypes";
import getMockProducts from "@/data/products/getMockProducts";
import { updateProductDto } from "@/types/dtos/product/productDto";

const setProductsDispatch =
  (actionType: string, params?: QueryParams) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: updateProductDto[];
    }>
  ): Promise<void> => {
    let Products: updateProductDto[] = [];
    switch (actionType) {
      case ProductActions.INIT_LIST:
        Products = await apiGetProducts.apiGetInitItems();
        if (!Products) {
          Products = getMockProducts;
        }
        break;
      case ProductActions.QUERIFIED_LIST:
        if (params) {
          Products = getMockProducts;
          Products = await apiGetProducts.apiSortedProductsList(params);
          if (!Products) {
            Products = getMockProducts;
          }
        }
        break;
      default:
        break;
    }
    dispatch(actions.setProducts(Products));
  };
export default setProductsDispatch;
