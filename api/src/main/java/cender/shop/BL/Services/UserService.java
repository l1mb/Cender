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
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthService _authService;

    @Autowired
    AuthRepository _authRepository;

    final
    ModelMapper _modelMapper;

    final
    BCryptPasswordEncoder _crypt;

    public UserService(BCryptPasswordEncoder _crypt, ModelMapper _modelMapper) {
        this._crypt = _crypt;
        this._modelMapper = _modelMapper;
    }


    public ServiceResult login(loginUserDto loginModel){
        var user = userRepository.getByLogin(loginModel.email);

        if (user == null){
            return new ServiceResult(ServiceResultType.InvalidData, "User doesn't exists");
        }

        return !_authService.getHash(user.getId()).equals(_crypt.encode(loginModel.password))?
                new ServiceResult(ServiceResultType.InvalidData, "Password incorrect")
                :
                new ServiceResult(ServiceResultType.Success, "User authorized");
    }

    public ServiceResult register(UserDto info) {
        var user = convertDtoToUser(info);
        user.registrationDate = Date.from(Instant.now());
        user.firstName="salt";
        user.lastName="sool";

        createUser(user);

        return new ServiceResult(ServiceResultType.Success, "User registered");
    }


    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return userRepository.getByLogin(login);
    }

    public User getUserByLogin(String login){return userRepository.getByLogin(login);}

    public User updateUser(String login, User castedUser) {
        var user = getUserByLogin(login);
        user.email = castedUser.email;
        user.username = castedUser.username;
        userRepository.updateUser(Math.toIntExact(user.getId()), user.email, user.firstName, user.lastName, user.username, user.registrationDate);
        return user;
    }

    //TODO: cloudinary
    //todo need to add this thing
    public ServiceResult updatePassword(String login, String password) throws NoSuchAlgorithmException {
        var user = getUserByLogin(login);
        var auth = _authRepository.findByUserId(user.getId());
        var salt = Hash.getSalt();
        auth.hash= Hash.toHex(Hash.getSaltedHash(password, salt));
        auth.salt = salt;
        _authRepository.updateAuth(Math.toIntExact(auth.getId()),auth.hash, auth.salt, auth.emailConfirmed?1:0);
        return new ServiceResult(ServiceResultType.Success);
    }

    public ServiceResult createUser(User mapped) {
        userRepository.createUser(mapped.email, mapped.firstName, mapped.lastName, mapped.username);
        return new ServiceResult(ServiceResultType.Success);
    }

    public User convertDtoToUser(UserDto userDto){
        var us = new User();
        us.username=userDto.username;
        us.email = userDto.email;
        return us;
    }


}
