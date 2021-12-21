package com.example.lab1;

import com.example.lab1.Exceptions.MyException;
import com.example.lab1.dto.productDto;
import com.example.lab1.model.product;
import com.example.lab1.model.vendor;
import com.example.lab1.repos.productsRepository;
import com.example.lab1.repos.vendorRepository;
import com.example.lab1.services.productService;
import com.example.lab1.services.vendorservice;
import com.example.lab1.services.ServiceCode;
import com.example.lab1.services.ServiceResult;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class productServiceTests {
    @Mock
    productsRepository productsRepository;

    @Mock
    vendorRepository vendorRepository;

    @InjectMocks
    productService productsService;

    @InjectMocks
    vendorservice vendorservice;

    @Test
    void addproduct_ShouldReturnServiceResult_Positive() throws MyException {
        var expectedvendor = new vendor(1L,"Test");
        var expectedResult = new ServiceResult(ServiceCode.CREATED, "product added");

        when(vendorRepository.findByName("Test")).thenReturn(expectedvendor);
        doNothing().when(productsRepository).addNewproduct(1L, "asd", "18+", 12, "asd");

        var actual = productsService.addproduct(new productDto("asd", "Test", "18+", "asd", 12));

        assertThat(actual.id).isEqualTo(expectedResult.id);
    }

    @Test
    void getproductById_ShouldReturnproduct_Positive(){
        long id = 1337L;
        product expected = new product("q", new vendor(), "asd", "18+", 10, id);
        when(productsRepository.getproductById(id)).thenReturn(expected);
        var actual = productsService.getproductById(id);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getproductsByPageNumber_ShouldReturnArrayList_Positive(){
        int page = 1;
        int size = 8;

        ArrayList<product> expected = new ArrayList<product>(8);
        when(productsRepository.getproductsByPageNumber(page, size, null)).thenReturn(expected);
        var actual = productsService.getproductsByPageNumber(page, size, null);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getById_ShouldReturnvendor_Positive(){
        long id = 2;
        vendor expected = new vendor(id, "Test");
        when(vendorRepository.getById(id)).thenReturn(expected);
        var actual = vendorservice.getById(id);
        assertThat(expected).isEqualTo(actual);
    }

    @Test
    void getvendors_ShouldReturnIterable_Positive(){
        Iterable<vendor> expected = new ArrayList<vendor>(4);
        when(vendorRepository.getvendors()).thenReturn(expected);
        var actual = vendorservice.getvendors();
        assertThat(actual).isEqualTo(expected);
    }
}
