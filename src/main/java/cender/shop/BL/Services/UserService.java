package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Users.User;
import cender.shop.DL.Repositories.UserRepository;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthService _authService;

    @Autowired
    ModelMapper _modelMapper;

    @Autowired
    BCryptPasswordEncoder _crypt;


    public ServiceResult login(loginUserDto loginModel){
        var user = userRepository.getByEmail(loginModel.email);

        if (user == null){
            return new ServiceResult(ServiceResultType.InvalidData, "User doesn't exists");
        }

        return !_authService.getHash(user.getId()).equals(_crypt.encode(loginModel.password))?
                new ServiceResult(ServiceResultType.InvalidData, "Password incorrect")
                :
                new ServiceResult(ServiceResultType.Success, "User authorized");
    }

    public ServiceResult register(UserDto info){
        var user = _modelMapper.map(info, User.class);
        userRepository.save(user);
        return new ServiceResult(ServiceResultType.Success, "User registered");
    }

    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return userRepository.getByEmail(login);
    }

}
