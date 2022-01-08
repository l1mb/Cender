package com.example.lab1;

import cender.shop.BL.Exceptions.MyException;
import cender.shop.BL.Services.ProductService;
import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.BL.Services.VendorService;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Entities.Vendor;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.DL.Repositories.VendorRepository;
import cender.shop.PL.dto.ProductDto;
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
class ProductServiceTests {
    @Mock
    ProductsRepository ProductsRepository;

    @Mock
    VendorRepository VendorRepository;

    @InjectMocks
    ProductService ProductsService;

    @InjectMocks
    VendorService Vendorservice;

    @Test
    void addProduct_ShouldReturnServiceResult_Positive() throws MyException {
        var expectedVendor = new Vendor(1L,"Test");
        var expectedResult = new ServiceResult(ServiceCode.CREATED, "Product added");

        when(VendorRepository.findByName("Test")).thenReturn(expectedVendor);
        doNothing().when(ProductsRepository).addNewProduct(1L, "asd", "18+", 12, "asd");

        var actual = ProductsService.addProduct(new ProductDto("asd", "Test", "18+", "asd", 12));

        assertThat(actual.id).isEqualTo(expectedResult.id);
    }

    @Test
    void getProductById_ShouldReturnProduct_Positive(){
        long id = 1337L;
        Product expected = new Product("q", new Vendor(), "asd", "18+", 10, id);
        when(ProductsRepository.getProductById(id)).thenReturn(expected);
        var actual = ProductsService.getProductById(id);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getProductsByPageNumber_ShouldReturnArrayList_Positive(){
        int page = 1;
        int size = 8;

        ArrayList<Product> expected = new ArrayList<Product>(8);
        when(ProductsRepository.getProductsByPageNumber(page, size, null)).thenReturn(expected);
        var actual = ProductsService.getProductsByPageNumber(page, size, null);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getById_ShouldReturnVendor_Positive(){
        long id = 2;
        Vendor expected = new Vendor(id, "Test");
        when(VendorRepository.getById(id)).thenReturn(expected);
        var actual = Vendorservice.getById(id);
        assertThat(expected).isEqualTo(actual);
    }

    @Test
    void getVendors_ShouldReturnIterable_Positive(){
        Iterable<Vendor> expected = new ArrayList<Vendor>(4);
        when(VendorRepository.getVendors()).thenReturn(expected);
        var actual = Vendorservice.getVendors();
        assertThat(actual).isEqualTo(expected);
    }
}
