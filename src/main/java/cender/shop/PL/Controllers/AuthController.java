package cender.shop.PL.Controllers;


import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Services.AuthService;
import cender.shop.BL.Services.OrderService;
import cender.shop.PL.DTO.User.BasicUserDto;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

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
    public String SignUp(@ModelAttribute UserDto userModel) {
        var result = _authService.signUp(userModel);

        return ""+result+"";
    }

    ///  <summary>
    ///      Returns a new JWT token to registered users
    ///  </summary>
    ///  <param name="userModel">User data transfer object</param>
    ///  <returns>Returns a new JWT token</returns>
    ///  <response code="200">Token is generated</response>
    ///  <response code="400">Unable to authenticate with provided email or password</response>
    @PostMapping("sign-in")
    public String SignIn(@ModelAttribute loginUserDto userModel) {
        var result = _authService.signIn(userModel);
        return ""+result;
    }

    ///  <summary>
    ///      Confirms user email
    ///  </summary>
    ///  <param name="id">User id</param>
    ///  <param name="token">Email confirmation token</param>
    ///  <returns>No content</returns>
    ///  <response code="204">Email confirmed successfully</response>
    ///  <response code="400">Email cannot be confirmed</response>
    @GetMapping("email-confirmation")
    public String ConfirmEmail(@RequestParam int id,@RequestParam String token) {
        return _authService.returnMessage();
    }
}