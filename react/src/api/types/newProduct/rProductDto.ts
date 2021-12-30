export interface readProductDto {
  id?: number;
  name: string;
  description: string;
  logo: string;
  price: number;
  shape: string;
  pickups?:number;
  mnfrId:number;
}
