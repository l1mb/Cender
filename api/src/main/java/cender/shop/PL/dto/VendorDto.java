package cender.shop.PL.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class VendorDto {
    @NotNull
    @NotBlank
    private String vendorName;
}
