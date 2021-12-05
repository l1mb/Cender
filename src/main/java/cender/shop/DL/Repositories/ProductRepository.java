package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    @Query(value = "exec GetBySearchTerm :term", nativeQuery = true)
    Iterable<Product> getBySearchTerm(@Param("term") String term);

    @Procedure(value = "GetProductList")
    Iterable<Product> getProductList();


    @Procedure(value = "exec CreateProduct")
    void createProduct(Product product);


    @Procedure(value = "exec UpdateProduct")
    void updateProduct(Product product);


    @Query(value = "exec DeleteProduct :gameId", nativeQuery = true)
    void deleteProduct(@Param("gameId") Long gameId);



    @Query(value = "exec GetProductById :id", nativeQuery = true)
    Product getProductById(@Param("id") Long id);
}
