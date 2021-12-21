package com.example.lab1.services;

import com.example.lab1.Exceptions.MyException;
import com.example.lab1.dto.productDeleteDto;
import com.example.lab1.dto.productDto;
import com.example.lab1.dto.productEditDto;
import com.example.lab1.model.product;
import com.example.lab1.model.vendor;
import com.example.lab1.repos.productsRepository;
import com.example.lab1.repos.vendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class productService {
    @Autowired
    productsRepository productsRepository;

    @Autowired
    vendorRepository vendorRepository;

    private final Pattern _pattern = Pattern.compile("\\d{2}\\+|\\d\\+");

    public product getproductById(Long id) { return productsRepository.getproductById(id); }

    public ServiceResult addproduct(productDto info) throws MyException {

        try {
            Matcher matcher = _pattern.matcher(info.rating);

            if (!matcher.matches()) {
                return new ServiceResult(ServiceCode.BAD_REQUEST, "Rating incorrect. Example: 18+");
            }

            vendor vendor = vendorRepository.findByName(info.vendor);

            productsRepository.addNewproduct(vendor.getId(), info.title, info.rating, info.price, info.productDescription);

            return new ServiceResult(ServiceCode.CREATED, "product added");
        } catch(Exception ex){
            throw new MyException(ex.getMessage());
        }
    }

    public ServiceResult editproduct(productEditDto info){

        Matcher matcher = _pattern.matcher(info.rating);

        if (!matcher.matches()){
            return new ServiceResult(ServiceCode.BAD_REQUEST, "Rating incorrect. Example: 18+");
        }

        vendor vendor = vendorRepository.findByName(info.vendor);

        productsRepository.updateproduct(info.id, vendor.getId(), info.title, info.rating, info.price, info.productDescription);

        return new ServiceResult(ServiceCode.CREATED, "product successfully edited");
    }

    public ServiceResult deleteproduct(productDeleteDto info){
        productsRepository.deleteproduct(info.id);

        return new ServiceResult(ServiceCode.OK, "product successfully deleted");
    }


    public ArrayList<product> getproductsByPageNumber(int page, int size, String title){
        if (title == null){
            return (ArrayList<product>) productsRepository.getproductsByPageNumber(page, size, null);
        }
        return (ArrayList<product>) productsRepository.getproductsByPageNumber(page, size, title);
    }

    public Iterable<product> getproducts(){
        return productsRepository.getproducts();
    }

    public int getproductsCount(){
        return productsRepository.getproductsCount();
    }

    public int getproductsByTitleCount(String title) {return productsRepository.getproductsByTitleCount(title);}
}
