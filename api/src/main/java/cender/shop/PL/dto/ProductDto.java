package cender.shop.PL.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProductDto {

    @NotBlank
    @NotNull
    public String title;
    @NotBlank
    @NotNull
    public String vendor;
    @NotBlank
    @NotNull
    public String rating;
    @NotBlank
    @NotNull
    public String productDescription;

    public float price;

    public ProductDto(String title, String vendor, String rating, String productDescription, float price){
        this.title = title;
        this.vendor = vendor;
        this.rating = rating;
        this.productDescription = productDescription;
        this.price = price;
    }
}
