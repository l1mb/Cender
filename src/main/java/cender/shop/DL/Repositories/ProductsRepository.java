package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface ProductsRepository extends CrudRepository<Product, Long>{
    @Modifying
    @Query(value = "insert into Products (publisher, title) values (:publisher, :title)", nativeQuery = true)
    @Transactional
    void addNewGame(@Param("publisher") String publisher, @Param("title") String title);

    @Modifying
    @Query(value = "update Products set publisher = :publisher, title = :title where id = :id", nativeQuery = true)
    @Transactional
    void updateGame(@Param("publisher") String publisher, @Param("title") String title, @Param("id") Long id);

    Iterable<Product> findByTitleContains(String Title);

    @Query(value = "select * from Products order by price asc", nativeQuery = true)
    Iterable<Product> findAllSortedByPriceAscending();

    @Query(value = "select * from Products order by price desc", nativeQuery = true)
    Iterable<Product> findAllSortedByPriceDescending();

    @Query(value = "select * from Products order by title asc", nativeQuery = true)
    Iterable<Product> findAllSortedByTitleAscending();

    @Query(value = "select * from Products order by title desc", nativeQuery = true)
    Iterable<Product> findAllSortedByTitleDescending();

    Iterable<Product> findAllByTitleContainsOrderByPriceAsc(String title);
    Iterable<Product> findAllByTitleContainsOrderByPriceDesc(String title);
    Iterable<Product> findAllByTitleContainsOrderByTitleAsc(String title);
    Iterable<Product> findAllByTitleContainsOrderByTitleDesc(String title);
}
