package cender.shop.PL.controllers;

import cender.shop.BL.Services.ProductService;
import cender.shop.BL.aop.LogAnnotation;
import cender.shop.DL.Entities.Product;
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
    ProductService ProductService;

    @LogAnnotation
    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns a list of Products by requested page number and page size")
    @GetMapping(value = "/api/GetProductsByPage")
    public ResponseEntity<?> catalog(int page, int size, String title, String sort, int priceFrom, int priceTo, boolean rating18) throws IOException {
        try {
            ArrayList<Product> Products = new ArrayList<>();

            if (title == "") {
                Products = ProductService.getProductsByPageNumber(page, size, null);
            } else {
                Products = ProductService.getProductsByPageNumber(page, size, title);
            }

            if (Products == null) {
                return (ResponseEntity<?>) ResponseEntity.badRequest();
            }

            switch (sort) {
                case "priceAsc":
                    Products.sort(Product.PRICE_ASCENDING_COMPARATOR);
                    break;
                case "priceDesc":
                    Products.sort(Product.PRICE_DESCENDING_COMPARATOR);
                    break;
                case "titleAsc":
                    Products.sort(Product.TITLE_ASCENDING_COMPARATOR);
                    break;
                case "titleDesc":
                    Products.sort(Product.TITLE_DESCENDING_COMPARATOR);
                    break;
            }

            ArrayList<Product> out_Products = new ArrayList<>();

            for (Product Product : Products) {
                if (rating18) {
                    if (Product.getPrice() >= priceFrom && Product.getPrice() <= priceTo) {
                        out_Products.add(Product);
                    }
                } else if (!Product.getRating().equals("18+")) {
                    if (Product.getPrice() >= priceFrom && Product.getPrice() <= priceTo) {
                        out_Products.add(Product);
                    }
                }
            }

            StringWriter writer = new StringWriter();
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(writer, out_Products);

            return ResponseEntity.ok(writer.toString());
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
