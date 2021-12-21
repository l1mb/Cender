package cender.shop.PL.controllers;

import cender.shop.BL.Exceptions.MyException;
import cender.shop.BL.Services.ProductService;
import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.PL.dto.ProductDto;
import cender.shop.PL.dto.productDeleteDto;
import cender.shop.PL.dto.productEditDto;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class ProductController {
    @Autowired
    private ProductService productService;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Creates a new entry of product in the database")
    @PostMapping(value = {"/api/addproduct"})
    public ResponseEntity saveNewproduct(@RequestBody ProductDto product) {
        ServiceResult serviceResult = null;
        try {
            serviceResult = productService.addProduct(product);
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
        return ResponseEntity.ok(Math.round(productService.getProductsCount() / size));
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Removes entry of product in the database using provided productDeleteDto")
    @DeleteMapping(value = {"/api/deleteproduct"})
    public ResponseEntity deleteproduct(@RequestBody productDeleteDto product){
        try {
            ServiceResult result = productService.deleteProduct(product);


            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            var products = productService.getProductsByPageNumber(1, 8, null);
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
            ServiceResult serviceresult = productService.editProduct(product);

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
            var product = productService.getProductById(id);
            if (product == null) {
                return ResponseEntity.badRequest().build();
            }

            productEditDto result = new productEditDto(product.getTitle(), product.getVendor().getVendorName(),
                    product.getRating(), product.getProductDescription(), product.getId(), product.getPrice());

            return ResponseEntity.ok(result);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
