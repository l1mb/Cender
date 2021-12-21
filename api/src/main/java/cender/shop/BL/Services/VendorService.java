package cender.shop.BL.Services;

import cender.shop.DL.Entities.Vendor;
import cender.shop.DL.Repositories.VendorRepository;
import cender.shop.PL.dto.VendorDeleteDto;
import cender.shop.PL.dto.VendorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    @Autowired
    VendorRepository vendorRepository;

    public ServiceResult addVendor(VendorDto info){
        vendorRepository.addVendor(info.getVendorName());
        return new ServiceResult(ServiceCode.CREATED, "vendor successfully added");
    }

    public Iterable<Vendor> getVendors(){
        return vendorRepository.getVendors();
    }

    public Iterable<Vendor> getVendorsByPageNumber(int page, int size) {return vendorRepository.getVendorsByPageNumber(page, size);}

    public int getVendorsCount() {return vendorRepository.getVendorCount();}

    public Vendor getById(Long id) {return vendorRepository.getById(id);}

    public ServiceResult editVendor(Vendor info){
        vendorRepository.editVendor(info.getId(), info.getVendorName());

        return new ServiceResult(ServiceCode.OK, "product successfully edited");
    }

    public ServiceResult deleteVendor(VendorDeleteDto info){
        vendorRepository.deleteVendor(info.getId());

        return new ServiceResult(ServiceCode.OK, "product successfully deleted");
    }
}
