import Platforms from "./enums/platfrom";

interface IBasicProduct {
  id: number;
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
  platform: Platforms;
  totalRating: number;
  publicationDate: Date;
}

export default IBasicProduct;
