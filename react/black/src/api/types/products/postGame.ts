import Platforms from "./enums/platfrom";

interface PostProductDto {
  id?: number;
  name: string;
  developers: string;
  publishers: string;
  genre: number;
  rating: number;
  logo: File;
  background: File;
  price: number;
  count: number;
  dateCreated: Date;
  platform: Platforms;
  totalRating: number;
  publicationDate: Date;
}

export default PostProductDto;
