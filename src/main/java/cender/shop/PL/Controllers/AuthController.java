package cender.shop.PL.Controllers;


import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController("api/auth")
public class AuthController {


    ///  <summary>
    ///      Creates a new user in database and sends him a confirmation link
    ///  </summary>
    ///  <param name="userModel">User data transfer object</param>
    ///  <returns>Returns a new user from database</returns>
    ///  <response code="201">Returns the newly created item</response>
    ///  <response code="400">If the item is null</response>
    @PostMapping("sign-up")
    @ResponseStatus(HttpStatus.CREATED )
    public HttpStatus SignUp(BasicUserDto userModel) {
        return HttpStatus.CREATED;
    }

    ///  <summary>
    ///      Returns a new JWT token to registered users
    ///  </summary>
    ///  <param name="userModel">User data transfer object</param>
    ///  <returns>Returns a new JWT token</returns>
    ///  <response code="200">Token is generated</response>
    ///  <response code="400">Unable to authenticate with provided email or password</response>
    @PostMapping("sign-in")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus SignIn(BasicUserDto userModel) {
        return HttpStatus.OK;
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public HttpStatus ConfirmEmail(@PathVariable String id,@PathVariable String token) {
        return HttpStatus.NO_CONTENT;
    }
}