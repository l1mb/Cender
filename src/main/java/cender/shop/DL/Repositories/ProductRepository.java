package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ProductRepository extends CrudRepository<Product, Long> {
    ArrayList<Product> getBySearchTerm(String term);

    ArrayList<Product> getProductList();
}
