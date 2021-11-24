package cender.shop.PL.DTO.Product;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Data
public class ProductDto {

        @Size(min = 0, max = 25)
        private String name;
        @Min(0)
        private int priceFrom;
        @Min(0)
        private int priceTo;

        private String sort;

        public ProductDto(){
            this.name = "";
            this.priceFrom = 0;
            this.priceTo = 100;
            this.sort = "priceAsc";
        }
}
