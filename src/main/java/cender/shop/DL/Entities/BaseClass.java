package cender.shop.DL.Entities;

import cender.shop.DL.Interfaces.IBaseClass;

import javax.validation.constraints.Min;

public class BaseClass implements IBaseClass {
    @Min(0)
    int id;
}
