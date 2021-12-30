import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import endpoints from "../endpoints";
import { readProductDto } from "../types/newProduct/rProductDto";
import IBasicProduct from "../types/products/IBasicProduct";
import httpService from "./httpService";

const apiProductsList = async (orderby: string, ordertype: number, displayLimit: number): Promise<readProductDto[]> => {
  const downloadLimit = 3;
  const data = await httpService.get<readProductDto[]>(
    `${endpoints.getProductListEndpoint}?Limit=${downloadLimit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data.slice(0, downloadLimit);
};

const apiNonGroupedProductsList = async (
  orderby: string,
  ordertype: number,
  limit: number
): Promise<readProductDto[]> => {
  const data = await httpService.get<readProductDto[]>(
    `${endpoints.getProductListEndpoint}?Limit=${limit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data;
};

const apiSortedProductsList = async (params: QueryParams): Promise<readProductDto[]> => {
  const query = buildString(
    params.orderby,
    params.type,
    params.limit,
    params.offset,
    params.shape,
    params.mnfrId,
    params.pickUp
  );
  const data = await httpService.get<readProductDto[]>(`${endpoints.getProductListEndpoint + query}`);

  return data;
};

const apiGetSearchProducts = async (name: string): Promise<readProductDto[]> => {
  const data = await httpService.get<readProductDto[]>(`${endpoints.getProductSearchEndpoint}?term=${name}&limit=10`);
  return data;
};

const apiGetPagedItems = async (limit: number, offset: number) => {
  const data = await httpService.get<readProductDto[]>(`${endpoints.products}?offset=${limit}&limit=${offset}`);
  return data;
};

export default {
  apiProductsList,
  apiSortedProductsList,
  apiGetSearchProducts,
  apiNonGroupedProductsList,
  apiGetPagedItems,
};
