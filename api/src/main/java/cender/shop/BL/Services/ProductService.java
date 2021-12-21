package cender.shop.BL.Services;

import cender.shop.BL.Exceptions.MyException;
import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Entities.Vendor;
import cender.shop.DL.Repositories.VendorRepository;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.PL.dto.ProductDto;
import cender.shop.PL.dto.productDeleteDto;
import cender.shop.PL.dto.productEditDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ProductService {
    @Autowired
    ProductsRepository ProductsRepository;

    @Autowired
    VendorRepository vendorRepository;

    private final Pattern _pattern = Pattern.compile("\\d{2}\\+|\\d\\+");

    public Product getProductById(Long id) { return ProductsRepository.getProductById(id); }

    public ServiceResult addProduct(ProductDto info) throws MyException {

        try {
            Matcher matcher = _pattern.matcher(info.rating);

            if (!matcher.matches()) {
                return new ServiceResult(ServiceCode.BAD_REQUEST, "Rating incorrect. Example: 18+");
            }

            Vendor vendor = vendorRepository.findByName(info.vendor);

            ProductsRepository.addNewProduct(vendor.getId(), info.title, info.rating, info.price, info.productDescription);

            return new ServiceResult(ServiceCode.CREATED, "Product added");
        } catch(Exception ex){
            throw new MyException(ex.getMessage());
        }
    }

    public ServiceResult editProduct(productEditDto info){

        Matcher matcher = _pattern.matcher(info.rating);

        if (!matcher.matches()){
            return new ServiceResult(ServiceCode.BAD_REQUEST, "Rating incorrect. Example: 18+");
        }

        Vendor vendor = vendorRepository.findByName(info.vendor);

        ProductsRepository.updateProduct(info.id, vendor.getId(), info.title, info.rating, info.price, info.productDescription);

        return new ServiceResult(ServiceCode.CREATED, "Product successfully edited");
    }

    public ServiceResult deleteProduct(productDeleteDto info){
        ProductsRepository.deleteProduct(info.id);

        return new ServiceResult(ServiceCode.OK, "Product successfully deleted");
    }


    public ArrayList<Product> getProductsByPageNumber(int page, int size, String title){
        if (title == null){
            return (ArrayList<Product>) ProductsRepository.getProductsByPageNumber(page, size, null);
        }
        return (ArrayList<Product>) ProductsRepository.getProductsByPageNumber(page, size, title);
    }

    public Iterable<Product> getProducts(){
        return ProductsRepository.getProducts();
    }

    public int getProductsCount(){
        return ProductsRepository.getProductsCount();
    }

    public int getProductsByTitleCount(String title) {return ProductsRepository.getProductsByTitleCount(title);}
}
