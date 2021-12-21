package src.main.java.cender.shop.shop;

import src.main.java.cender.shop.shop.BL.Enums.ServiceResultType;
import src.main.java.cender.shop.shop.BL.Services.UserService;
import src.main.java.cender.shop.shop.DL.Entities.Product;
import src.main.java.cender.shop.shop.DL.Entities.Users.User;
import src.main.java.cender.shop.shop.PL.DTO.User.UserDto;
import src.main.java.cender.shop.shop.PL.DTO.User.loginUserDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class userControllerTests {
    @Mock
    UserRepository usersRepository;

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
        var res = new ServiceResult(ServiceResultType.Success);
        when(userService.register(new UserDto())).thenReturn(res);

        var actual = userService.register(new UserDto());
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
