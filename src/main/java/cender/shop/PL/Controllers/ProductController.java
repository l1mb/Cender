package cender.shop.PL.Controllers;


import cender.shop.BL.Services.ProductService;
import cender.shop.DL.Entities.Product;
import cender.shop.PL.DTO.Product.ProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController()
@RequestMapping("api/products")
public class ProductController {

    private ProductService _productService;

    public ProductController(ProductService productService){
        this._productService = productService;
    }

    ///  <summary>
    ///      Filter products by their names, skipped count and offset from the first element
    ///  </summary>
    ///  <returns>Returns list of product models</returns>
    ///  <response code="200">All products received</response>
    @GetMapping("search")
    public Product GetProductsByTerm(@RequestParam String param) {
        var result = _productService.getProductByTerms();

        return result.Data;
    }

    ///  <summary>
    ///      Get full information about product via its id
    ///  </summary>
    ///  <returns>Returns full product properties model</returns>
    ///  <response code="200">Product successfully received</response>
    ///  <response code="404">Product doesn't exist</response>
    @GetMapping("id/{id:int}")
    public Product GetProductById(@PathVariable int id) {
        var result = _productService.getProductById(id);

        return result.Data;
    }

    ///  <summary>
    ///      Create product with provided model properties
    ///  </summary>
    ///  <param name="productDto">data transfer object for creating a new product in database</param>
    ///  <response code="201">Created successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @PostMapping()
    public Product CreateNewProduct(@ModelAttribute ProductDto model) {
        var result = _productService.createNewProduct(model);
        return result;
    }

    ///  <summary>
    ///      Updates product with provided model properties
    ///  </summary>
    ///  <param name="basicProductDto">data transfer object for updating existing product in database</param>
    ///  <response code="200">Updated successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @PutMapping()
    public ResponseEntity UpdateProduct(@ModelAttribute ProductDto model) {
        _productService.updateProduct(model);
        return ResponseEntity.noContent().build();
    }

    ///  <summary>
    ///      Mark product as deleted in database
    ///  </summary>
    ///  <param name="id">product id</param>
    ///  <returns>No content</returns>
    ///  <response code="204">Product marked successfully</response>
    ///  <response code="400">Problems with updating entity or saving changes in database</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @DeleteMapping("id/{id:int}")
    public ResponseEntity DeleteProduct(@PathVariable int id) {
        _productService.deleteProduct(id);
        return ResponseEntity.noContent().build();

    }

    ///  <summary>
    ///      Get paged list of products from the database
    ///  </summary>
    ///  <param name="productParametersDto">Provided parameters model</param>
    ///  <returns></returns>
    ///  <response code="200">Products paged successfully</response>
    @GetMapping("list/{term:String}")
    public ResponseEntity<ArrayList<Product>> GetProductList(@PathVariable(required = false) String term) {
        var result = _productService.getProductList(term);
        return ResponseEntity.ok(result);
    }
}