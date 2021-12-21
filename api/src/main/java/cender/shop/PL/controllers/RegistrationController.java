package com.example.cender.controllers;

import com.example.cender.aop.LogAnnotation;
import com.example.cender.dto.UserRegisterDto;
import com.example.cender.services.ServiceCode;
import com.example.cender.services.ServiceResult;
import com.example.cender.services.UserService;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class RegistrationController {
    
    @Autowired
    UserService userService;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Creates a new entry of user in the database")
    @PostMapping("/api/register")
    private ResponseEntity register(@RequestBody UserRegisterDto user){
        try {
            ServiceResult serviceResult = userService.register(user);

            if (serviceResult.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok().build();
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
