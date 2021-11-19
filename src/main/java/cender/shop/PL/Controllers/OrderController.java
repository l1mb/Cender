package cender.shop.PL.Controllers;


import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("api/orders")
public class OrderController {
    ///  <summary>
    ///      Get information about order using provided id
    ///  </summary>
    ///  <remark>By default, id is application user id</remark>
    ///  <param name="id">Order id</param>
    ///  <response code="200">Information taken successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="404">Order doesn't exist</response>
    @GetMapping()
    public void GetOrderList(int[] id) {
    }

    ///  <summary>
    ///      Create new order with provided properties model
    ///  </summary>
    ///  <remark>By default, id is application user id</remark>
    ///  <param name="orderDto">Order properties model</param>
    ///  <returns>Extended order properties model</returns>
    ///  <response code="201">Order created successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="500">Order already exist</response>
    @PostMapping()
    public void CreateOrder() {

    }

    ///  <summary>
    ///      Updates orders range
    ///  </summary>
    ///  <returns>Updated collection</returns>
    ///  <response code="200">Orders updated successfully</response>
    ///  <response code="401">User is not authenticated</response>
    @PutMapping()
    public HttpStatus UpdateOrder() {
        return HttpStatus.OK;
    }

    ///  <summary>
    ///      Delete orders range
    ///  </summary>
    ///  <remark>By default, id is application user id</remark>
    ///  <param name="orders">Orders collection</param>
    ///  <returns>No content</returns>
    ///  <response code="204">Information deleted successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="404">Order doesn't exist</response>
    @DeleteMapping("{id}")
    public HttpStatus DeleteOrder(@PathVariable int id) {
        return HttpStatus.NO_CONTENT;
    }

    ///  <summary>
    ///      Complete all user's orders
    ///  </summary>
    ///  <returns>No content</returns>
    ///  <response code="204">Orders completed successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="500">Unable to perform payment</response>
    @PostMapping("buy")
    public void OrderPayment() {
    }
}