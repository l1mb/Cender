package cender.shop.PL.dto;

import cender.shop.PL.dto.productOrderInfoDto;
import lombok.Data;

@Data
public class OrderInfoDto {
    private Long orderId;
    private productOrderInfoDto[] products;
}
