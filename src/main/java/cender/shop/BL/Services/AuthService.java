package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.*;
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

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;

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
    private EmailConfirmationService _emailService;

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

        var userId = _userRepository.getByEmail(userDto.email).getId();
        if(!_authRepository.findByUserId(userId).emailConfirmed){
            return new ServiceResultP<>(ServiceResultType.InternalError, "Access denied, confirm your email first");
        }

        final UserDetails userDetails = _userService.loadUserByUsername(userDto.email);

        final String jwt = _jwtUtil.generateToken(userDetails);

        return new ServiceResultP<String>(ServiceResultType.Success, "", jwt);
    }

    @Transactional
    public ServiceResultP<User> signUp(UserDto userDto) throws NoSuchAlgorithmException {
        var createdUser = _userService.createUser(userDto);
        var salt  = Hash.getSalt();
        var auth =new Auth (Math.toIntExact(createdUser.getId()), Hash.toHex(Hash.getSaltedHash(userDto.password, salt)), Hash.toHex(salt));

        // todo salt type should be varbinaryhelicopter255
        auth.token = _emailService.generateToken();
        var result= _emailService.sendConfirmationLink(auth);
        var link = "http://localhost:1498/api/email-confirm?token="+ auth.token;
        var message = EmailBuilder.buildEmail(userDto.username, link);
        _emailService.send(userDto.email, message);
        _authRepository.save(auth);
        return new ServiceResultP<>(ServiceResultType.Success, createdUser);
    }



    public String getHash(Long id) {
        var auth = _authRepository.getHashByUserId(id);
        return auth.hash;
    }
}
