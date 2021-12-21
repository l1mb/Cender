import AgeRating from "./enums/ageRating";
import Genre from "./enums/genre";
import OrderBy from "./enums/orderBy";
import OrderType from "./enums/orderType";
import QueryItem from "./queryParams";

const AgeOprions: Array<QueryItem> = [
  {
    label: "All ages",
    value: AgeRating.Empty,
  },
  {
    label: "6+",
    value: AgeRating.EarlyChildhood,
  },
  {
    label: "12+",
    value: AgeRating.Teen,
  },
  {
    label: "18+",
    value: AgeRating.Adult,
  },
];

const GenreOptions: Array<QueryItem> = [
  {
    label: "All genres",
    // Api issue
    value: Genre.Fighting,
  },
  {
    label: "Fighting",
    value: Genre.Fighting,
  },
  {
    label: "Horror",
    value: Genre.Horror,
  },
  {
    label: "Moba",
    value: Genre.Moba,
  },
  {
    label: "Race",
    value: Genre.Race,
  },
  {
    label: "Shooter",
    value: Genre.Shooter,
  },
  {
    label: "Simulator",
    value: Genre.Simulator,
  },
  {
    label: "Slasher",
    value: Genre.Slasher,
  },
  {
    label: "Survival",
    value: Genre.Survival,
  },
];

const OrderByOptions: Array<QueryItem> = [
  {
    label: "Name",
    value: OrderBy.Name,
  },
  {
    label: "Genre",
    value: OrderBy.Genre,
  },
  {
    label: "Count",
    value: OrderBy.Count,
  },
  {
    label: "Price",
    value: OrderBy.Price,
  },
  {
    label: "Publication Date",
    value: OrderBy.PublicationDate,
  },
  {
    label: "Total Rating",
    value: OrderBy.TotalRating,
  },
];
const OrderTypeOptions: Array<QueryItem> = [
  {
    label: "Ascending",
    value: OrderType.Asc,
  },
  {
    label: "Descending",
    value: OrderType.Desc,
  },
];

export default { AgeOprions, GenreOptions, OrderByOptions, OrderTypeOptions };
