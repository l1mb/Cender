interface IBasicProduct {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  company: string;
  category?: string;
}

export default IBasicProduct;
