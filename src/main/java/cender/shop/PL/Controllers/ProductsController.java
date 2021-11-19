package cender.shop.PL.Controllers;

import cender.shop.DL.Entities.Product;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.PL.DTO.Product.ProductFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@RestController
public class ProductsController {

    @Autowired
    ProductsRepository products;

    @GetMapping(value = "/products")
    public ResponseEntity<ArrayList<Product>> catalog(@ModelAttribute("filter") ProductFilter filter){
        ArrayList<Product> Products = new ArrayList<>();
        ArrayList<Product> searchCollection = new ArrayList<>();

        if (Objects.equals(filter.getName(), "")){
            switch(filter.getSort()){
                case "priceAsc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllSortedByPriceAscending());
                    break;
                }
                case "priceDesc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllSortedByPriceDescending());
                    break;
                }
                case "TitleAsc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllSortedByTitleAscending());
                    break;
                }
                case "TitleDesc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllSortedByTitleDescending());
                    break;
                }
            }
        }
        else {
            switch(filter.getSort()){
                case "priceAsc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllByTitleContainsOrderByPriceAsc(filter.getName()));
                    break;
                }
                case "priceDesc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllByTitleContainsOrderByPriceDesc(filter.getName()));
                    break;
                }
                case "TitleAsc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllByTitleContainsOrderByTitleAsc(filter.getName()));
                    break;
                }
                case "TitleDesc":{
                    searchCollection.addAll((Collection<? extends Product>) products.findAllByTitleContainsOrderByTitleDesc(filter.getName()));
                    break;
                }
            }
        }

        for (Product Product : searchCollection){
            if (

                    (Product.getPrice() < filter.getPriceFrom() || Product.getPrice() > filter.getPriceTo())
            ){
                continue;
            }
            Products.add(Product);
        }
        return ResponseEntity.ok().body(Products);
    }
}
