package cender.shop.PL.controllers;

import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.BL.Services.UserService;
import cender.shop.BL.email.EmailService;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Entities.User;
import cender.shop.DL.Repositories.UsersRepository;
import cender.shop.PL.dto.CreateOrderDto;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class BasketController {

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    @Autowired
    UsersRepository usersRepository;

    @ApiResponse(code = 200, response = ResponseEntity.class, message = "Order created successfully")
    @Operation(description = "Creates new entry of order in the database and send order confirmation message to user email")
    @PostMapping(value = "/api/create-order")
    public ResponseEntity createOrder(@RequestBody CreateOrderDto order){
        try {
            if (order == null) {
                return ResponseEntity.badRequest().build();
            }

            User user = userService.getUserByLogin(order.getUserEmail());

            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            float total = 0;

            for (int i = 0; i < order.getProducts().length; i++) {
                total += order.getProducts()[i].getPrice();
            }

            ServiceResult result1 = userService.createOrder(user.getId(), total);

            if (result1.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            int orderId = userService.getLastOrderId(user.getId());

            ServiceResult result2 = userService.addproductsToOrder(orderId, order.getProducts());

            if (result2.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            try {
                emailService.send(order.getUserEmail(), buildMessage(order.getProducts(), user.getName(), total));
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok().build();
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    private String buildMessage(Product[] products, String userName, float total){
        String out = "Thanks for your order!<br><br>" +
                "Dear, " + userName + ", here's the list of products you purchased:<br><br>" +
                "============================================<br>";
        for (int i = 0; i < products.length; i++) {
            Product product = products[i];
            out += i + 1 + ": " + product.getTitle() + " (" + product.getRating() + ") -> " + product.getPrice() + "$<br>";
        }

        out += "<br>Your total: " + String.format("%.2f", total) + "$<br>";
        out += "============================================<br><br>" +
                "Thanks for you money hehehehehe";
        return out;
    }
}
