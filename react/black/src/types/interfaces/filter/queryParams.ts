import AgeRating from "@/api/types/Products/enums/ageRating";
import Genre from "@/api/types/Products/enums/genre";
import OrderBy from "@/api/types/Products/enums/orderBy";
import OrderType from "@/api/types/Products/enums/orderType";

interface QueryParams {
  criteria: OrderBy | undefined;
  type: OrderType | undefined;
  age: AgeRating | undefined;
  genre: Genre | undefined;
}

export default QueryParams;
