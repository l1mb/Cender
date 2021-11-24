package cender.shop.PL.DTO.Cart;

import cender.shop.DL.Enums.OrderStatus;

import javax.validation.constraints.Min;
import java.util.Date;

public class OutputOrderDto {
    @Min(0)
    public OrderStatus status;

    public Date createDate;

    public Date updateDate;
}

