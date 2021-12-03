package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.JwtUtil;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Entities.Users.User;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.DL.Repositories.UserRepository;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthService {

    @Autowired
    private AuthRepository _authRepository;

    @Autowired
    private ModelMapper _modelMapper;

    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private AuthenticationManager _authenticationManager;

    @Autowired
    private UserService  _userService;

    @Autowired
    private JwtUtil _jwtUtil;


    public ServiceResultP<String> signIn(loginUserDto userDto) throws Exception {
        try {
            _authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.email, userDto.password)
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = _userService.loadUserByUsername(userDto.email);

        final String jwt = _jwtUtil.generateToken(userDetails);

        return new ServiceResultP<String>(ServiceResultType.Success, "", jwt);
    }

    public ServiceResultP<User> signUp(UserDto userDto){
        _authRepository.save(new Auth(1L, 1,userDto.password ));
        var user = _modelMapper.map(userDto, User.class);
        return new ServiceResultP(ServiceResultType.Success, user);
    }


    public ServiceResult confirmEmail(int id, String token) {
        var user = _userRepository.findById((long) id);
        user.get().isEmailConfirmed = true;

        return new ServiceResult(ServiceResultType.Success);
    }

    public String getHash(Long id) {
        var auth = _authRepository.getHashByUserId(id);
        return auth.hash;
    }
}
