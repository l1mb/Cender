package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductService{

    public ServiceResultP<Product> getProductByTerms() {
        return new ServiceResultP(ServiceResultType.Success);
    }

    public ServiceResultP<Product> getProductById(int id) {
        return new ServiceResultP(ServiceResultType.Success);
    }
}
