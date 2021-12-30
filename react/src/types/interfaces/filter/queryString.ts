import OrderBy from "@/api/types/Products/enums/orderBy";
import OrderType from "@/api/types/Products/enums/orderType";

const handleFirstItem = (src: string, addedValue: string) => {
  const data = (src === "?" ? "" : `&`) + addedValue.toLowerCase();
  return data;
};

const buildString = (
  orderby?: string | OrderBy,
  type?: string | OrderType,
  limit?: number,
  offset?: number,
  shape?: string,
  mnfrId?: number,
  pickUpId?: number
): string => {
  let initQuery = "?";

  initQuery += orderby ? `orderby=${orderby.toLowerCase()}` : "";
  initQuery += type ? handleFirstItem(initQuery, `mode=desc`) : "";
  initQuery += limit ? handleFirstItem(initQuery, `limit=${limit}`) : "";
  initQuery += offset ? handleFirstItem(initQuery, `offset=${offset}`) : "";
  initQuery += shape ? handleFirstItem(initQuery, `shape=${shape}`) : "";
  initQuery += mnfrId ? handleFirstItem(initQuery, `mnfrId=${mnfrId}`) : "";
  initQuery += pickUpId ? handleFirstItem(initQuery, `pickUpId=${pickUpId}`) : "";
  return initQuery;
};

export default buildString;
