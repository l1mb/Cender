package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Repositories.ProductRepository;
import cender.shop.PL.DTO.Product.ProductDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProductService{

    @Autowired
    private ProductRepository _productRepository;
    private ModelMapper modelMapper;

    public ServiceResultP<Product> getProductByTerms() {
        return new ServiceResultP(ServiceResultType.Success);
    }

    public ServiceResultP<Product> getProductById(int id) {
        var product = _productRepository.findById((long) id);
        if(product.isEmpty()){
            return new ServiceResultP<>(ServiceResultType.NotFound, "The product cannot be found");
        }
        return new ServiceResultP<Product>(ServiceResultType.Success, product.get());
    }

    public Product createNewProduct(ProductDto model) {
        var mappedProduct = modelMapper.map(model, Product.class);
        return _productRepository.save(mappedProduct);
    }

    public Product updateProduct(ProductDto model) {
        var parsed = modelMapper.map(model, Product.class);
        return _productRepository.save(parsed);
    }

    public void deleteProduct(int id) {
         var product =  _productRepository.findById((long) id);
        if(product.isEmpty()){
            //threw exception

        }
        _productRepository.delete(product.get());
    }

    public ArrayList<Product> getProductList(String term) {

        return (ArrayList<Product>) _productRepository.getBySearchTerm(term);

    }

    public ArrayList<Product> getProductList() {

        return (ArrayList<Product>) _productRepository.getProductList();

    }
}