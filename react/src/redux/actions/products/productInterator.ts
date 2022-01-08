import { Dispatch } from "react";
import { toast } from "react-toastify";
import apiGetProducts from "@/api/httpService/apiGetProducts";
import ProductsApi from "@/api/httpService/products/productsApi";
import actions from "../actions";
import ProductActions from "../manufacturers/newsActionTypes";
import { productDto, updateProductDto } from "@/types/dtos/product/productDto";
import getOptions from "@/api/httpService/tokenedOptions";

const detectPromise = (actionType: string, body: productDto | updateProductDto | number): Promise<Response> => {
  switch (actionType) {
    case ProductActions.CREATE: {
      const t = getOptions<productDto>("POST", true, body);
      return fetch(`${"/api/addproduct"}`, t);
    }
    case ProductActions.UPDATE: {
      const t = getOptions<productDto>("PUT", true, body);
      return fetch(`${"/api/editproduct"}`, t);
    }
    case ProductActions.DELETE: {
      const t = getOptions<productDto>("DELETE", true, {
        id: body,
      });
      return fetch(`${"/api/deleteproduct"}`, t);
    }
    default:
      return ProductsApi.postProduct(body as FormData);
  }
};

const ProductInteractions =
  (actionType: string, body: productDto | updateProductDto | number) =>
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
    const Products = await apiGetProducts.apiGetInitItems();

    dispatch(actions.setProducts(Products));
  };

export default ProductInteractions;
