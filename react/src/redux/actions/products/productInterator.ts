import { Dispatch } from "react";
import { toast } from "react-toastify";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import ProductsApi from "@/api/httpService/products/productsApi";
import actions from "../actions";
import ProductActions from "../manufacturers/newsActionTypes";
import { readProductDto } from "@/api/types/newProduct/rProductDto";
import endpoints from "@/api/endpoints";

const detectPromise = (actionType: string, body: FormData | number): Promise<Response> => {
  switch (actionType) {
    case ProductActions.CREATE:
      return fetch(`${endpoints.products}`, { method: "POST", body });
    case ProductActions.UPDATE:
      return fetch(`${endpoints.products}`, { method: "PUT", body });
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
      payload: readProductDto[];
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
