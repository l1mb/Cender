package com.example.lab1;

import cender.shop.BL.Services.VendorService;
import cender.shop.DL.Entities.Vendor;
import cender.shop.DL.Repositories.VendorRepository;
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
class VendorServiceTests {
    @Mock
    VendorRepository vendorRepository;

    @InjectMocks
    VendorService vendorservice;

    @Test
    void getById_ShouldReturnvendor_Positive(){
        long id = 2;
        var expected = new Vendor(id, "Test");
        when(vendorRepository.getById(id)).thenReturn(expected);
        var actual = vendorservice.getById(id);
        assertThat(expected).isEqualTo(actual);
    }

    @Test
    void getvendors_ShouldReturnIterable_Positive(){
        var expected = new ArrayList<Vendor>(4);
        when(vendorRepository.getVendors()).thenReturn(expected);
        var actual = vendorservice.getVendors();
        assertThat(actual).isEqualTo(expected);
    }
}
