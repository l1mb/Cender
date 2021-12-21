package cender.shop;

import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.BL.Services.UserService;
import cender.shop.DL.Entities.User;
import cender.shop.DL.Repositories.UsersRepository;
import cender.shop.PL.dto.UserRegisterDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import src.main.java.cender.shop.shop.ProductRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class userControllerTests {
    @Mock
    UsersRepository usersRepository;

    @Mock
    ProductRepository productsRepository;

    @InjectMocks
    UserService userService;

    @Test
    void GetUserByIdTest(){
var us = new User();
        lenient().when(usersRepository.getByLogin("some login")).thenReturn(us);

        var actual = userService.getUserByLogin("some login");
        assertThat(actual).isEqualTo(us);
    }
    @Test
    void createUserTet(){
        var us = new User();
        var res = new ServiceResult(ServiceCode.OK, "");
        when(userService.register(new UserRegisterDto())).thenReturn(res);

        var actual = userService.register(new UserRegisterDto());
        assertThat(actual).isEqualTo(us);
    }

    @Test
    void updateUserTest(){
        var us = new User();
        lenient().when(usersRepository.getByLogin("some login")).thenReturn(us);
////
    }

    @Test
    void updatePasswordTest(){
        var us = new User();
        lenient().when(usersRepository.getByLogin("some login")).thenReturn(us);

        var actual = userService.getUserByLogin("some login");
        assertThat(actual).isEqualTo(us);
    }
}
