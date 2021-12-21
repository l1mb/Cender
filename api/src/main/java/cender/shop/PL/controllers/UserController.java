package com.example.lab1.controllers;

import com.example.lab1.aop.LogAnnotation;
import com.example.lab1.dto.productOrderInfoDto;
import com.example.lab1.dto.OrderInfoDto;
import com.example.lab1.model.User;
import com.example.lab1.services.UserService;
import com.example.lab1.utils.Jwt;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.ArrayList;

@Controller
public class UserController {

    @Autowired
    Jwt jwt;

    @Autowired
    UserService userService;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Return OrderInfoDto entity with order information inside")
    @GetMapping(value = "/api/get-order-info")
    public ResponseEntity getOrderInfo(@RequestHeader("Authorization") String token, Long orderId){
        try {
            String login = jwt.getLoginFromToken(token.substring(7));
            User user = userService.getUserByLogin(login);

            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            ArrayList<productOrderInfoDto> products = userService.getUserOrderproducts(orderId, user.getId());

            if (products.size() == 0) {
                return ResponseEntity.badRequest().build();
            }

            OrderInfoDto info = new OrderInfoDto();
            info.setOrderId(orderId);
            info.setproducts(products.toArray(new productOrderInfoDto[products.size()]));

            return ResponseEntity.ok(info);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns a list of user orders ids")
    @GetMapping(value = "/api/get-user-orders-ids")
    public ResponseEntity getUserOrdersIds(@RequestHeader("Authorization") String token){
        try {
            String login = jwt.getLoginFromToken(token.substring(7));
            User user = userService.getUserByLogin(login);

            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            Iterable<Integer> ids = userService.getUserOrdersIds(user.getId());

            return ResponseEntity.ok(ids);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
