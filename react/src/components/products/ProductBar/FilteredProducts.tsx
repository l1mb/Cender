import React from "react";
import ProductCard from "@/elements/home/productCardElement/productCard";
import { readProductDto } from "@/api/types/newProduct/rProductDto";

interface ProductProps {
  products?: readProductDto[];
}

const FilteredProducts: React.FC<ProductProps> = React.memo((props) => (
  <>
    {props.products &&
      props.products.map((u) => (
        <React.Fragment key={u.id}>
          <ProductCard key={u.name} product={u} />
        </React.Fragment>
      ))}
  </>
));
export default FilteredProducts;
