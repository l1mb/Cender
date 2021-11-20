package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.PL.DTO.User.UserDto;
import cender.shop.PL.DTO.User.loginUserDto;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthService {

    @Autowired
    private AuthRepository _authRepository;



    public String returnMessage(){
        return "Message";
    }

    public ServiceResult signIn(loginUserDto userDto){
        var list  = _authRepository.findAll();
        for  ( Auth i :list) {
                if(i.hash==userDto.password){
                    return new ServiceResult(ServiceResultType.Success);
                }
        }

        return new ServiceResult(ServiceResultType.NotFound);
    }
    public ServiceResult signUp(UserDto userDto){
        _authRepository.save(new Auth(1L, 1,userDto.password ));
        return new ServiceResult(ServiceResultType.Success);
    }



}
