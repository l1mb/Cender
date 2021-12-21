import QueryParams from "@/types/interfaces/filter/queryParams";
import buildString from "@/types/interfaces/filter/queryString";
import aggregateProductsDto from "../aggregateProductDto";
import endpoints from "../endpoints";
import IBasicProduct from "../types/products/IBasicProduct";
import IGroupedProduct from "../types/products/IGroupedProduct";
import httpService from "./httpService";

const apiProductsList = async (
  orderby: string,
  ordertype: number,
  displayLimit: number
): Promise<IGroupedProduct[]> => {
  const downloadLimit = 9;
  const data = await httpService.get<IBasicProduct[]>(
    `${endpoints.getProductListEndpoint}?Limit=${downloadLimit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  const aggregated = aggregateProductsDto(data);

  return aggregated.slice(0, displayLimit);
};

const apiNonGroupedProductsList = async (
  orderby: string,
  ordertype: number,
  limit: number
): Promise<IBasicProduct[]> => {
  const data = await httpService.get<IBasicProduct[]>(
    `${endpoints.getProductListEndpoint}?Limit=${limit}&OrderBy=${orderby}&OrderType=${ordertype}`
  );

  return data;
};

const apiSortedProductsList = async (params: QueryParams): Promise<IGroupedProduct[]> => {
  const query = buildString(params.criteria, params.type, params.age, params.genre);

  const data = await httpService.get<IBasicProduct[]>(`${endpoints.getProductListEndpoint + query}`);

  const aggregated = aggregateProductsDto(data);

  return aggregated;
};

const apiGetSearchProducts = async (name: string): Promise<IGroupedProduct[]> => {
  const data = await httpService.get<IBasicProduct[]>(`${endpoints.getProductSearchEndpoint}?term=${name}&limit=10`);
  const aggregated = aggregateProductsDto(data);
  return aggregated;
};

export default { apiProductsList, apiSortedProductsList, apiGetSearchProducts, apiNonGroupedProductsList };
