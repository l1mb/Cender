package cender.shop.DL.Entities;

import cender.shop.DL.Enums.OrderStatus;

import java.util.Date;

public class Order extends BaseClass {
    public int userId;
    public OrderStatus status;
    public Date createOrderDate;
    public Date updateOrderDate;
    public int productId;
    public int count;
 }
