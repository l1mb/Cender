package com.example.lab1.controllers;

import com.example.lab1.Exceptions.MyException;
import com.example.lab1.aop.LogAnnotation;
import com.example.lab1.dto.productDeleteDto;
import com.example.lab1.dto.productDto;
import com.example.lab1.dto.productEditDto;
import com.example.lab1.model.product;
import com.example.lab1.services.productService;
import com.example.lab1.services.ServiceCode;
import com.example.lab1.services.ServiceResult;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.logging.Logger;


@Controller
public class productController {
    @Autowired
    private productService productService;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Creates a new entry of product in the database")
    @PostMapping(value = {"/api/addproduct"})
    public ResponseEntity saveNewproduct(@RequestBody productDto product) {
        ServiceResult serviceResult = null;
        try {
            serviceResult = productService.addproduct(product);
        } catch (MyException e) {
            return ResponseEntity.badRequest().build();
        }

        if (serviceResult.id == ServiceCode.BAD_REQUEST){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns amount of pages with products by provided size")
    @GetMapping(value = "/api/get-pages-amount")
    public ResponseEntity getPagesAmount(int size){
        return ResponseEntity.ok(Math.round(productService.getproductsCount() / size));
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Removes entry of product in the database using provided productDeleteDto")
    @DeleteMapping(value = {"/api/deleteproduct"})
    public ResponseEntity deleteproduct(@RequestBody productDeleteDto product){
        try {
            ServiceResult result = productService.deleteproduct(product);


            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            ArrayList<product> products = productService.getproductsByPageNumber(1, 8, null);
            return ResponseEntity.ok(products);
        } catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Updates entry of product in the database using provided productEditDto")
    @PutMapping(value = {"/api/editproduct"})
    public ResponseEntity editproduct(@RequestBody productEditDto product){
        try {
            ServiceResult serviceresult = productService.editproduct(product);

            if (serviceresult.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok().build();
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns an entry of product from the database using provided id")
    @GetMapping(value = "/api/get-product-by-id")
    public ResponseEntity getproductById(Long id){
        try {
            product product = productService.getproductById(id);
            if (product == null) {
                return ResponseEntity.badRequest().build();
            }

            productEditDto result = new productEditDto(product.getTitle(), product.getvendor().getvendorName(),
                    product.getRating(), product.getproductDescription(), product.getId(), product.getPrice());

            return ResponseEntity.ok(result);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
