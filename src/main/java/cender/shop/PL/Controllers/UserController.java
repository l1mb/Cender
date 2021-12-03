package cender.shop.PL.Controllers;


import cender.shop.BL.Services.UserService;
import cender.shop.BL.Utilities.JWT;
import cender.shop.PL.DTO.User.BasicUserDto;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("api/user")
public class UserController {


    final
    JWT jwt;

    final
    UserService userService;x

    public UserController(JWT jwt, UserService userService) {
        this.jwt = jwt;
        this.userService = userService;
    }

    ///  <summary>
    ///      Update user profile with provided information
    ///  </summary>
    ///  <param name="updateUserModel">User data transfer object</param>
    ///  <returns>No content</returns>
    ///  <response code="204">Updated successfully</response>
    ///  <response code="400">If the item is null</response>
    ///  <response code="401">User is not authenticated</response>
    @PutMapping()
    public void UpdateUser() {

    }

    ///  <summary>
    ///      Update user password with provided information
    ///  </summary>
    ///  <param name="patch">Special patch request for updating password</param>
    ///  <returns>No content</returns>
    ///  <response code="204">Updated successfully</response>
    ///  <response code="400">If patch request is scrap</response>
    ///  <response code="401">User is not authenticated</response>
    @PatchMapping("password")
    public void UpdatePassword() {
    }

    ///  <summary>
    ///      Get information about user
    ///  </summary>
    ///  <returns>Returns information about user</returns>
    ///  <response code="200">Information received successfully</response>
    ///  <response code="400">If user claims is junk</response>
    ///  <response code="401">User is not authenticated</response>
    @GetMapping()
    public void GetInfo() {

    }
}