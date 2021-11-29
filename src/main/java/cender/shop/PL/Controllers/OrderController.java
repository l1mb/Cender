package cender.shop.PL.Controllers;


import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Services.OrderService;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("api/orders")
public class OrderController {

    private OrderService _orderService;


    public OrderController(OrderService orderService){
        this._orderService = orderService;
    }


    ///  <summary>
    ///      Get information about order using provided id
    ///  </summary>
    ///  <remark>By default, id is application user id</remark>
    ///  <param name="id">Order id</param>
    ///  <response code="200">Information taken successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="404">Order doesn't exist</response>
    @GetMapping("{id}")
    public String GetOrderList(@PathVariable(required = false) int id) {
        // todo improve
        var result = _orderService.getOrdersById((long) id);
        return _orderService.returnMessage();
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
    public ResponseEntity CreateOrder(@ModelAttribute BasicUserDto model) {
        var result = _orderService.createOrder(model);
        if(result.Result!= ServiceResultType.Success){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    ///  <summary>
    ///      Updates orders range
    ///  </summary>
    ///  <returns>Updated collection</returns>
    ///  <response code="200">Orders updated successfully</response>
    ///  <response code="401">User is not authenticated</response>
    @PutMapping()
    public String UpdateOrder(@ModelAttribute ExtendedOrderDto model) {
        var result = _orderService.updateExistingOrder(model);

        return result.ErrorMessage;
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
    public ResponseEntity  DeleteOrder(@PathVariable int[] id) {
        var result = _orderService.deleteOrder(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
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
        var result = _orderService.completeOrders();
    }

    @GetMapping("completed")
    public List<ExtendedOrderDto> GetCompleted(){
        var result = _orderService.getCompletedOrders();

        return result;
    }
}