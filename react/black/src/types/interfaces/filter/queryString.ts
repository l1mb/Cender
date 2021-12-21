import AgeRating from "@/api/types/Products/enums/ageRating";
import Genre from "@/api/types/Products/enums/genre";
import OrderBy from "@/api/types/Products/enums/orderBy";
import OrderType from "@/api/types/Products/enums/orderType";

const handleFirstItem = (src: string, addedValue: string) => {
  const data = (src === "?" ? "" : `&`) + addedValue;
  return data;
};

const buildString = (
  criteria: string | OrderBy | undefined,
  type: string | OrderType | undefined,
  age: string | AgeRating | undefined,
  genre: string | Genre | undefined
): string => {
  let initQuery = "?";

  initQuery += criteria ? `OrderBy=${criteria}` : "";
  initQuery += type ? handleFirstItem(initQuery, `OrderType=${type}`) : "";
  initQuery += age ? handleFirstItem(initQuery, `AgeRating=${age}`) : "";
  initQuery += genre ? handleFirstItem(initQuery, `Genre=${genre}`) : "";

  return initQuery;
};

export default buildString;
