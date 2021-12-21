import { Dispatch } from "@reduxjs/toolkit";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import QueryParams from "@/types/interfaces/filter/queryParams";
import actions from "../actions";
import ProductActions from "./productActionTypes";

const setProductsDispatch =
  (actionType: string, params?: QueryParams) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: IGroupedProduct[];
    }>
  ): Promise<void> => {
    let Products: IGroupedProduct[] = [];
    switch (actionType) {
      case ProductActions.INIT_LIST:
        Products = await apiGetProducts.apiProductsList("PublicationDate", 1, 3);

        break;
      case ProductActions.QUERIFIED_LIST:
        if (params) {
          Products = await apiGetProducts.apiSortedProductsList(params);
        }
        break;
      default:
        break;
    }
    dispatch(actions.setProducts(Products));
  };
export default setProductsDispatch;
