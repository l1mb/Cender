package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.Hash;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Entities.Users.User;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.DL.Repositories.UserRepository;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthService _authService;

    @Autowired
    AuthRepository _authRepository;

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

    public User getUserByLogin(String login){return userRepository.getByLogin(login);}

    public User updateUser(String login, User castedUser) {
        var user = getUserByLogin(login);
        user.email = castedUser.email;
        user.username = castedUser.username;
        userRepository.save(user);
        return user;
    }

    public Auth updatePassword(String login, String password) throws NoSuchAlgorithmException {
        var user = getUserByLogin(login);
        var auth = _authRepository.findByUseId(user.getId());
        auth.hash= Arrays.toString(Hash.getSaltedHash(password, Hash.getSalt()));
        return _authRepository.save(auth);
    }

    public User createUser(UserDto userDto) {
        var mapped = _modelMapper.map(userDto, User.class);
        var user = userRepository.save(mapped);
        return user;
    }
}
