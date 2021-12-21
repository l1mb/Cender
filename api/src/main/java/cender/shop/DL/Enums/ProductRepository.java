package com.example.lab1.repos;

import com.example.lab1.model.product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface productsRepository extends CrudRepository<product, Long>{
    @Procedure(value = "Addproduct")
    void addNewproduct(Long vendor_id, String title, String rating, float price, String product_description);

    @Procedure(value = "UpdateproductInfo")
    void updateproduct(Long id, Long vendor_id, String title, String rating, float price, String product_description);

    @Procedure(value = "Deleteproduct")
    void deleteproduct(Long productId);

    @Query(value = "exec GetproductsByPageNumber :page, :size, :title", nativeQuery = true)
    Iterable<product> getproductsByPageNumber(@Param("page") int page, @Param("size") int size, @Param("title") String title);

    @Query(value = "exec Getproducts", nativeQuery = true)
    Iterable<product> getproducts();

    @Query(value = "exec GetproductsCount", nativeQuery = true)
    int getproductsCount();

    @Query(value = "exec GetproductsByTitleCount :title", nativeQuery = true)
    int getproductsByTitleCount(@Param("title") String title);

    @Query(value = "exec GetproductById :id", nativeQuery = true)
    product getproductById(@Param("id") Long id);
}
