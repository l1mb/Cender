package cender.shop.PL.DTO.Product;

import lombok.Data;

@Data
public class ProductFilter {
    private String name;

    private int priceFrom;
    private int priceTo;

    private String sort;

    public ProductFilter(){
        this.name = "";
        this.priceFrom = 0;
        this.priceTo = 100;
        this.sort = "priceAsc";
    }
}
