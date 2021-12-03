package cender.shop.PL.Controllers;


import cender.shop.BL.Services.UserService;
import cender.shop.BL.Utilities.JWT;
import cender.shop.DL.Entities.Users.User;
import cender.shop.PL.DTO.User.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController()
@RequestMapping("api/user")
public class UserController {


    final
    JWT jwt;

    final
    UserService userService;
    final
    ModelMapper modelMapper;

    public UserController(JWT jwt, UserService userService, ModelMapper modelMapper) {
        this.jwt = jwt;
        this.userService = userService;
        this.modelMapper = modelMapper;
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
    @ApiResponse(responseCode = "204", description = "No content")
    @Operation(description = "Return updated user")
    public User UpdateUser(@RequestHeader("Authorization") String token, @RequestBody UserDto userDto) {
        String login = jwt.getLoginFromToken(token.substring(7));
        var castedUser = modelMapper.map(userDto, User.class);
        User user = userService.updateUser(login, castedUser);

        return user;
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
    @ApiResponse(responseCode = "204", description = "No content")
    @Operation(description = "Update user password")
    public void UpdatePassword(@RequestHeader("Authorization") String token, @RequestBody String password) throws NoSuchAlgorithmException {
        String login = jwt.getLoginFromToken(token.substring(7));
        var result = userService.updatePassword(login, password);
    }

    ///  <summary>
    ///      Get information about user
    ///  </summary>
    ///  <returns>Returns information about user</returns>
    ///  <response code="200">Information received successfully</response>
    ///  <response code="400">If user claims is junk</response>
    ///  <response code="401">User is not authenticated</response>
    @GetMapping()
    public User GetInfo(@RequestHeader("Authorization") String token) {
        var login = jwt.getLoginFromToken(token.substring(7));
        var user = userService.getUserByLogin(login);
        return user;
    }
}