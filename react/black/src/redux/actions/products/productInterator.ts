import { Dispatch } from "react";
import { toast } from "react-toastify";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import ProductsApi from "@/api/httpService/products/productsApi";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import actions from "../actions";
import ProductActions from "./productActionTypes";

const detectPromise = (actionType: string, body: FormData | number): Promise<Response> => {
  switch (actionType) {
    case ProductActions.CREATE:
      return ProductsApi.postProduct(body as FormData);
    case ProductActions.UPDATE:
      return ProductsApi.putProduct(body as FormData);
    case ProductActions.DELETE:
      return ProductsApi.deleteProduct(body as number);

    default:
      return ProductsApi.postProduct(body as FormData);
  }
};

const ProductInteractions =
  (actionType: string, body: FormData | number) =>
  async (
    dispatch: Dispatch<{
      type: string;
      payload: IGroupedProduct[];
    }>
  ): Promise<void> => {
    const promise: Promise<Response> = detectPromise(actionType, body);

    await toast.promise(promise, {
      pending: "Pending",
      success: "Success 👌",
      error: "Reject 🤯",
    });
    const Products = await apiGetProducts.apiProductsList("PublicationDate", 1, 3);

    dispatch(actions.setProducts(Products));
  };

export default ProductInteractions;
