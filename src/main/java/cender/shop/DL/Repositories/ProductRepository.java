package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    //TODO: add filtration and maybe pagination

    @Query(value = "exec GetBySearchTerm :term", nativeQuery = true)
    Iterable<Product> getBySearchTerm(@Param("term") String term);


    @Procedure(value = "GetProductList")
    Iterable<Product> getProductList();



    @Procedure(value = "exec CreateProduct")
    void createProduct(
            String name,
            int price ,
            String logo,
            Date creation_date
    );


    @Procedure(value = "exec UpdateProduct")
    void updateProduct(
            int id ,
            int manufacturer_id ,
            String name,
            int price  ,
            String logo,
            Date creation_date
    );


    @Query(value = "exec DeleteProduct :gameId", nativeQuery = true)
    void deleteProduct(@Param("gameId") Long gameId);



    @Query(value = "exec GetProductById :id", nativeQuery = true)
    Product getProductById(@Param("id") Long id);
}
