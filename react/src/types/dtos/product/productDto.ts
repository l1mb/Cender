export interface productDto {
  title: string;
  vendor: {
    id: number;
    vendorName: string;
  };
  rating: string;
  productDescription: string;
  price: number;
}

export interface updateProductDto extends productDto {
  id: number;
}

export interface deleteProduct {
  id: number;
}
