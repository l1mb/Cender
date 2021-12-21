package com.example.lab1.dto;

import com.example.lab1.model.product;
import lombok.Data;

@Data
public class CreateOrderDto {
    private product[] products;
    private String userEmail;
}
