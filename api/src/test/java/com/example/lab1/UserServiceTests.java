package com.example.lab1;

import com.example.lab1.dto.productOrderInfoDto;
import com.example.lab1.model.product;
import com.example.lab1.repos.productsRepository;
import com.example.lab1.repos.UsersRepository;
import com.example.lab1.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    UsersRepository usersRepository;

    @Mock
    productsRepository productsRepository;

    @InjectMocks
    UserService userService;

    @Test
    void getUserOrderproducts_ShouldReturnArrayList_Positive(){
        ArrayList<Integer> expectedIds = new ArrayList<>(4);
        product expectedproduct = new product();
        ArrayList<productOrderInfoDto> expectedResult = new ArrayList<>();

        lenient().when(usersRepository.getUserOrderproductsIds(1L, 1L)).thenReturn(expectedIds);
        lenient().when(productsRepository.getproductById(1L)).thenReturn(expectedproduct);

        var actual = userService.getUserOrderproducts(1L, 1L);
        assertThat(actual).isEqualTo(expectedResult);
    }
}
