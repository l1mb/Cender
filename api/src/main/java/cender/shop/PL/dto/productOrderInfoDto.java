package cender.shop.PL.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class productOrderInfoDto {

    @NotBlank
    @NotNull
    public String title;
    @NotBlank
    @NotNull
    public String vendor;
    @NotBlank
    @NotNull
    public String rating;

    public float price;
}

