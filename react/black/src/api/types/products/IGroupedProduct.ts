import Platforms from "./enums/platfrom";

interface IGroupedProduct {
  name: string;
  developers: string;
  publishers: string;
  genre: number;
  rating: number;
  logo: string;
  background: string;
  price: number;
  count: number;
  dateCreated: Date;
  platforms: Platforms[];
  totalRating: number;
  publicationDate: Date;

  ids: {
    id: number;
    platform: Platforms;
  }[];
}

export default IGroupedProduct;
