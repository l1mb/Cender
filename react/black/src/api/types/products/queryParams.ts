import AgeRating from "./enums/ageRating";
import Genre from "./enums/genre";
import OrderBy from "./enums/orderBy";
import OrderType from "./enums/orderType";

interface QueryItem {
  label: string;
  value: AgeRating | OrderType | OrderBy | Genre;
}

export default QueryItem;
