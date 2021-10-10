package cender.shop.DL.Entities;

import cender.shop.DL.Enums.GuitarType;

import java.util.Date;

public class Product extends BaseClass {
    public String name;
    public String description;
    public GuitarType guitarType;
    public String previewImage;
    public int count;
    public Date creationDate;
}
