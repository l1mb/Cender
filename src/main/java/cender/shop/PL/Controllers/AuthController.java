package cender.shop.PL.Controllers;


import cender.shop.BL.Services.AuthService;
import cender.shop.BL.Services.OrderService;
import cender.shop.DL.Entities.Users.User;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@Component
@RestController()
@RequestMapping("api/auth")
public class AuthController {

    private AuthService _authService;
    private OrderService _orderService;

    public AuthController(AuthService authService, OrderService orderService) {
        this._authService = authService;
        this._orderService = orderService;
    }

    ///  <summary>
    ///      Creates a new user in database and sends him a confirmation link
    ///  </summary>
    ///  <param name="userModel">User data transfer object</param>
    ///  <returns>Returns a new user from database</returns>
    ///  <response code="201">Returns the newly created item</response>
    ///  <response code="400">If the item is null</response>
    @PostMapping("sign-up")
    public User SignUp(@ModelAttribute UserDto userModel) throws NoSuchAlgorithmException {
        var result = _authService.signUp(userModel);


        return result.Data;
    }

    ///  <summary>
    ///      Returns a new JWT token to registered users
    ///  </summary>
    ///  <param name="userModel">User data transfer object</param>
    ///  <returns>Returns a new JWT token</returns>
    ///  <response code="200">Token is generated</response>
    ///  <response code="400">Unable to authenticate with provided email or password</response>
    @PostMapping("sign-in")
    public String SignIn(@ModelAttribute loginUserDto userModel) throws Exception {
        var result = _authService.signIn(userModel);
        // todo detect wrong output
        // and it should return jwt instead of entity
        return result.Data;
    }


}