package com.example.lab1;

import com.example.lab1.model.product;
import com.example.lab1.model.vendor;
import com.example.lab1.repos.productsRepository;
import com.example.lab1.repos.vendorRepository;
import com.example.lab1.services.productService;
import com.example.lab1.services.vendorservice;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class vendorserviceTests {
    @Mock
    vendorRepository vendorRepository;

    @InjectMocks
    vendorservice vendorservice;

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
