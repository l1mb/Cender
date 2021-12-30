import IBasicProduct from "./types/products/IBasicProduct";
import IGroupedProduct from "./types/products/IGroupedProduct";

const aggregateProductsDto = (data: IBasicProduct[]): IGroupedProduct[] => {
  const unique = [...new Set(data.map((item) => item.name))];
  const uniqueData = unique.map((item) => {
    const products = data.filter((d) => d.name === item);
    const platforms = products.map((p) => p.platform);
    return {
      ...products[0],
      platforms,
      ids: products.map((p) => ({
        id: p.id as number,
        platform: p.platform,
      })),
    };
  });
  return uniqueData;
};

export default aggregateProductsDto;
