export interface updateProductDto {
  id?: number;
  name: string;
  description: string;
  logo: string|File;
  price: number;
  mnfrId: number;
  shape: string;
  pickUpId: number;
}
