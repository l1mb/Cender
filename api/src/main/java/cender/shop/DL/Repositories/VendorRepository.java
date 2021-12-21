package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Vendor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface VendorRepository extends CrudRepository<Vendor, Long> {
    @Query(value = "exec GetVendorByName :name", nativeQuery = true)
    Vendor findByName(@Param("name") String name);

    @Query(value = "exec GetVendorById :id", nativeQuery = true)
    Vendor getById(@Param("id") Long id);

    @Query(value = "exec GetVendors", nativeQuery = true)
    Iterable<Vendor> getVendors();

    @Query(value = "exec GetVendorsByPageNumber :page, :size", nativeQuery = true)
    Iterable<Vendor> getVendorsByPageNumber(@Param("page") int page, @Param("size") int size);

    @Procedure(value = "AddVendor")
    void addVendor(String name);

    @Procedure(value = "DeleteVendor")
    void deleteVendor(Long id);

    @Procedure(value = "EditVendor")
    void editVendor(Long id, String name);

    @Query(value = "exec GetVendorsCount", nativeQuery = true)
    int getVendorCount();
}
