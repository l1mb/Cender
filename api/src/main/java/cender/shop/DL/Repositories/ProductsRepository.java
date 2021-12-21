package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface ProductsRepository extends CrudRepository<Product, Long>{
    @Procedure(value = "AddProduct")
    void addNewProduct(Long vendor_id, String title, String rating, float price, String Product_description);

    @Procedure(value = "UpdateProductInfo")
    void updateProduct(Long id, Long vendor_id, String title, String rating, float price, String Product_description);

    @Procedure(value = "DeleteProduct")
    void deleteProduct(Long ProductId);

    @Query(value = "exec GetProductsByPageNumber :page, :size, :title", nativeQuery = true)
    Iterable<Product> getProductsByPageNumber(@Param("page") int page, @Param("size") int size, @Param("title") String title);

    @Query(value = "exec GetProducts", nativeQuery = true)
    Iterable<Product> getProducts();

    @Query(value = "exec GetProductsCount", nativeQuery = true)
    int getProductsCount();

    @Query(value = "exec GetProductsByTitleCount :title", nativeQuery = true)
    int getProductsByTitleCount(@Param("title") String title);

    @Query(value = "exec GetProductById :id", nativeQuery = true)
    Product getProductById(@Param("id") Long id);
}
