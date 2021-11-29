package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Entities.Users.User;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.DL.Repositories.UserRepository;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthService {

    @Autowired
    private AuthRepository _authRepository;
    private UserRepository _userRepository;

    public ServiceResultP<User> signIn(loginUserDto userDto){
        var list  = _authRepository.findAll();
        for  ( Auth i :list) {
                if(i.hash==userDto.password){
                    var user  = _userRepository.findById(i.userId);
                    return new ServiceResultP(ServiceResultType.Success, user);
                }
        }

        return new ServiceResultP(ServiceResultType.NotFound);
    }

    public ServiceResult signUp(UserDto userDto){
        _authRepository.save(new Auth(1L, 1,userDto.password ));
        return new ServiceResult(ServiceResultType.Success);
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
