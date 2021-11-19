package cender.shop.PL.Controllers;


import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("api/products")
public class ProductController {
    ///  <summary>
    ///      Filter products by their names, skipped count and offset from the first element
    ///  </summary>
    ///  <returns>Returns list of product models</returns>
    ///  <response code="200">All products received</response>
    @GetMapping("search")
    public void GetProductsByTerm() {

    }

    ///  <summary>
    ///      Get full information about product via its id
    ///  </summary>
    ///  <returns>Returns full product properties model</returns>
    ///  <response code="200">Product successfully received</response>
    ///  <response code="404">Product doesn't exist</response>
    @GetMapping("id/{id:int}")
    public  void GetProductById(@PathVariable int id) {

    }

    ///  <summary>
    ///      Create product with provided model properties
    ///  </summary>
    ///  <param name="productDto">data transfer object for creating a new product in database</param>
    ///  <response code="201">Created successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @PostMapping()
    public void CreateNewProduct() {

    }

    ///  <summary>
    ///      Create rating with provided model properties
    ///  </summary>
    ///  <param name="ratingDto">data transfer object for creating a new product in database</param>
    ///  <response code="201">Created successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @PostMapping("rating")
    public void CreateRating() {

    }

    ///  <summary>
    ///      Updates product with provided model properties
    ///  </summary>
    ///  <param name="basicProductDto">data transfer object for updating existing product in database</param>
    ///  <response code="200">Updated successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="403">User has no access to this resource</response>
    @PutMapping()
    public void UpdateProduct() {

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
    public void DeleteProduct(@PathVariable int id) {

    }

    ///  <summary>
    ///      Get paged list of products from the database
    ///  </summary>
    ///  <param name="productParametersDto">Provided parameters model</param>
    ///  <returns></returns>
    ///  <response code="200">Products paged successfully</response>
    @GetMapping("list")
    public void GetProductList() {
    }
}