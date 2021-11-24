package cender.shop.PL.DTO.Cart;

import javax.validation.constraints.Min;

public class ExtendedOrderDto extends BasicOrderDto{
    @Min(0)
    public int id;
}
