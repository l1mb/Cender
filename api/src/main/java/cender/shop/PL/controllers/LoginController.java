package cender.shop.PL.controllers;

import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.BL.Services.UserService;
import cender.shop.BL.Utilities.Jwt;
import cender.shop.PL.dto.UserInfoDto;
import cender.shop.PL.dto.UserLoginDto;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    Jwt jwt;

    @Autowired
    UserService userService;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns new JWT generated using provided UserLoginDto")
    @PostMapping(value = "/api/auth")
    public ResponseEntity auth(@RequestBody UserLoginDto info){
        try {
            ServiceResult result = userService.login(info);

            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            String token = jwt.generateToken(info.login);

            return ResponseEntity.ok(token);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns information of authorized user")
    @GetMapping(value = "api/get-user")
    public ResponseEntity getUser(@RequestHeader("Authorization") String token){
        try {
            String login = jwt.getLoginFromToken(token.substring(7));
            var user = userService.getUserByLogin(login);

            if (user == null) {
                return ResponseEntity.badRequest().build();
            }

            var ret = new UserInfoDto();
            ret.setLogin(user.getLogin());
            ret.setName(user.getName());
            ret.setRoles(user.getRoles());

            return ResponseEntity.ok(ret);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
