package com.example.lab1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class productEditDto {

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

    public Long id;

    public float price;
}
