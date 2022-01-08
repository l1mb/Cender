package com.example.lab1;

import cender.shop.BL.Services.UserService;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.DL.Repositories.UsersRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.lenient;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    UsersRepository usersRepository;

    @Mock
    ProductsRepository productsRepository;

    @InjectMocks
    UserService userService;

    @Test
    void getUserOrderproducts_ShouldReturnArrayList_Positive(){
        ArrayList<Integer> expectedIds = new ArrayList<>(4);
        var expectedproduct = new Product();
        var expectedResult = new ArrayList<>();

        lenient().when(usersRepository.getUserOrderproductsIds(1L, 1L)).thenReturn(expectedIds);
        lenient().when(productsRepository.getProductById(1L)).thenReturn(expectedproduct);

        var actual = userService.getUserOrderproducts(1L, 1L);
        assertThat(actual).isEqualTo(expectedResult);
    }
}
