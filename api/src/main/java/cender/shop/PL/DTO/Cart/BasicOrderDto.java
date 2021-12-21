package cender.shop.PL.DTO.Cart;

import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.Min;

public class BasicOrderDto
    {
        @NotNull
        public int productId;

        @NotNull
        @Min(0)
        public int applicationUserId;

        @NotNull
        @Min(0)
        public int count;
    }
