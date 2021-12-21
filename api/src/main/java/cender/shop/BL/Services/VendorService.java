package com.example.lab1.services;

import com.example.lab1.dto.vendorDeleteDto;
import com.example.lab1.dto.vendorDto;
import com.example.lab1.model.vendor;
import com.example.lab1.repos.vendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class vendorservice {

    @Autowired
    vendorRepository vendorRepository;

    public ServiceResult addvendor(vendorDto info){
        vendorRepository.addvendor(info.getvendorName());
        return new ServiceResult(ServiceCode.CREATED, "vendor successfully added");
    }

    public Iterable<vendor> getvendors(){
        return vendorRepository.getvendors();
    }

    public Iterable<vendor> getvendorsByPageNumber(int page, int size) {return vendorRepository.getvendorsByPageNumber(page, size);}

    public int getvendorsCount() {return vendorRepository.getvendorCount();}

    public vendor getById(Long id) {return vendorRepository.getById(id);}

    public ServiceResult editvendor(vendor info){
        vendorRepository.editvendor(info.getId(), info.getvendorName());

        return new ServiceResult(ServiceCode.OK, "product successfully edited");
    }

    public ServiceResult deletevendor(vendorDeleteDto info){
        vendorRepository.deletevendor(info.getId());

        return new ServiceResult(ServiceCode.OK, "product successfully deleted");
    }
}
