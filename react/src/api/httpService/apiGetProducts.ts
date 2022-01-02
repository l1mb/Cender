import { updateProductDto } from "@/types/dtos/product/productDto";
import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import endpoints from "../endpoints";
import httpService from "./httpService";

const apiProductsList = async (
  orderby: string,
  ordertype: number,
  displayLimit: number
): Promise<updateProductDto[]> => {
  const downloadLimit = 3;
  const data = await httpService.get<updateProductDto[]>(
    `${endpoints.getProductListEndpoint}?Limit=${downloadLimit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data.slice(0, downloadLimit);
};

const apiGetInitItems = async (): Promise<updateProductDto[]> => {
  const data = await httpService.get<updateProductDto[]>(
    `${endpoints.getProductListEndpoint}?priceFrom=0&priceTo=999999&size=3&page=1`
  );

  return data;
};

const apiNonGroupedProductsList = async (
  orderby: string,
  ordertype: number,
  limit: number
): Promise<updateProductDto[]> => {
  const data = await httpService.get<updateProductDto[]>(
    `${endpoints.getProductListEndpoint}?Limit=${limit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data;
};

const apiSortedProductsList = async (params: QueryParams): Promise<updateProductDto[]> => {
  const query = buildString(
    params.shape,
    params.orderBy,
    params.ageRating,
    params.from,
    params.to,
    params.title,
    params.page
  );
  const data = await httpService.get<updateProductDto[]>(`${endpoints.getProductListEndpoint + query}`);

  return data;
};

const apiGetSearchProducts = async (name: string): Promise<updateProductDto[]> => {
  const data = await httpService.get<updateProductDto[]>(
    `${endpoints.getProductListEndpoint}?title=${name}&page=1&size=10&priceFrom=0&priceTo=1000000`
  );
  return data;
};

const apiGetPagedItems = async (limit: number, offset: number) => {
  const data = await httpService.get<updateProductDto[]>(`${endpoints.products}?offset=${limit}&limit=${offset}`);
  return data;
};

export default {
  apiProductsList,
  apiSortedProductsList,
  apiGetSearchProducts,
  apiNonGroupedProductsList,
  apiGetPagedItems,
  apiGetInitItems,
};
