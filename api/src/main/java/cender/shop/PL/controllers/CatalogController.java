package com.example.lab1.controllers;

import com.example.lab1.aop.LogAnnotation;
import com.example.lab1.model.product;
import com.example.lab1.services.productService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;

@RestController
public class CatalogController {

    @Autowired
    productService productService;

    @LogAnnotation
    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns a list of products by requested page number and page size")
    @GetMapping(value = "/api/GetproductsByPage")
    public ResponseEntity<?> catalog(int page, int size, String title, String sort, int priceFrom, int priceTo, boolean rating18) throws IOException {
        try {
            ArrayList<product> products = new ArrayList<>();

            if (title == "") {
                products = productService.getproductsByPageNumber(page, size, null);
            } else {
                products = productService.getproductsByPageNumber(page, size, title);
            }

            if (products == null) {
                return (ResponseEntity<?>) ResponseEntity.badRequest();
            }

            switch (sort) {
                case "priceAsc":
                    products.sort(product.PRICE_ASCENDING_COMPARATOR);
                    break;
                case "priceDesc":
                    products.sort(product.PRICE_DESCENDING_COMPARATOR);
                    break;
                case "titleAsc":
                    products.sort(product.TITLE_ASCENDING_COMPARATOR);
                    break;
                case "titleDesc":
                    products.sort(product.TITLE_DESCENDING_COMPARATOR);
                    break;
            }

            ArrayList<product> out_products = new ArrayList<>();

            for (product product : products) {
                if (rating18) {
                    if (product.getPrice() >= priceFrom && product.getPrice() <= priceTo) {
                        out_products.add(product);
                    }
                } else if (!product.getRating().equals("18+")) {
                    if (product.getPrice() >= priceFrom && product.getPrice() <= priceTo) {
                        out_products.add(product);
                    }
                }
            }

            StringWriter writer = new StringWriter();
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(writer, out_products);

            return ResponseEntity.ok(writer.toString());
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
