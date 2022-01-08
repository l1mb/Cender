package cender.shop.PL.dto;

import cender.shop.DL.Entities.Product;
import lombok.Data;

@Data
public class CreateOrderDto {
    private Product[] products;
    private String userEmail;
}
