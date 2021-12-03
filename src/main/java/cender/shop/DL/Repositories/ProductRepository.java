package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
