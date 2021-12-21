package cender.shop.PL.Controllers;


import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Services.OrderService;
import cender.shop.BL.Utilities.JWT;
import cender.shop.BL.Utilities.TokenDynamoElectricMachine;
import cender.shop.DL.Entities.Order;
import cender.shop.PL.DTO.Cart.BasicOrderDto;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("api/orders")
public class OrderController {


    private final TokenDynamoElectricMachine tdem;
    private final OrderService _orderService;

    private final JWT jwt;


    public OrderController(JWT jwt, OrderService orderService, TokenDynamoElectricMachine tdem, OrderService _orderService){
        this._orderService = orderService;
        this.tdem = tdem;
        this.jwt = jwt;
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
    public Order GetOrderList(@PathVariable(required = false) int id) {
        // todo improve
        var result = _orderService.getOrdersById((long) id);
        return result;
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
    public ResponseEntity CreateOrder(@RequestBody BasicOrderDto order) {
        if (order == null){
            return ResponseEntity.badRequest().build();
        }
        var result = _orderService.createOrder(order);
        if(result.Result!= ServiceResultType.Success){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
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
    public ResponseEntity  DeleteOrder(@PathVariable Long[] id) {
        var result = _orderService.deleteOrder(id);

        return ResponseEntity.noContent().build();
    }

    ///  <summary>
    ///      Complete all user's orders
    ///  </summary>
    ///  <returns>No content</returns>
    ///  <response code="204">Orders completed successfully</response>
    ///  <response code="401">User is not authenticated</response>
    ///  <response code="500">Unable to perform payment</response>
    @PostMapping("buy")
    public ResponseEntity OrderPayment(@RequestHeader("Authorization") String token) {
        var tok = tdem.getToken(token);
        var login = jwt.getLoginFromToken(tok);
        _orderService.completeOrders(login);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("completed")
    public ResponseEntity<List<Order>> GetCompleted(@RequestHeader("Authorization") String token){
        var tok = tdem.getToken(token);
        var login = jwt.getLoginFromToken(tok);
        var result = _orderService.getCompletedOrders(login);


        return ResponseEntity.ok(result);
    }
}