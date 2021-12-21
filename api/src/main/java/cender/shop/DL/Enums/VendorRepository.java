package com.example.lab1.repos;

import com.example.lab1.model.product;
import com.example.lab1.model.vendor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface vendorRepository extends CrudRepository<vendor, Long> {
    @Query(value = "exec GetvendorByName :name", nativeQuery = true)
    vendor findByName(@Param("name") String name);

    @Query(value = "exec GetvendorById :id", nativeQuery = true)
    vendor getById(@Param("id") Long id);

    @Query(value = "exec Getvendors", nativeQuery = true)
    Iterable<vendor> getvendors();

    @Query(value = "exec GetvendorsByPageNumber :page, :size", nativeQuery = true)
    Iterable<vendor> getvendorsByPageNumber(@Param("page") int page, @Param("size") int size);

    @Procedure(value = "Addvendor")
    void addvendor(String name);

    @Procedure(value = "Deletevendor")
    void deletevendor(Long id);

    @Procedure(value = "Editvendor")
    void editvendor(Long id, String name);

    @Query(value = "exec GetvendorsCount", nativeQuery = true)
    int getvendorCount();
}
