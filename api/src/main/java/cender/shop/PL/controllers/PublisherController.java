package com.example.lab1.controllers;

import com.example.lab1.aop.LogAnnotation;
import com.example.lab1.dto.vendorDeleteDto;
import com.example.lab1.dto.vendorDto;
import com.example.lab1.model.vendor;
import com.example.lab1.services.vendorservice;
import com.example.lab1.services.ServiceCode;
import com.example.lab1.services.ServiceResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;

@Controller
public class vendorController {

    @Autowired
    private vendorservice vendorservice;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Creates new entry of vendor in the database using provided vendorDto")
    @PostMapping(value = "/api/addvendor")
    public ResponseEntity Addvendor(@RequestBody vendorDto vendor){
        try {
            ServiceResult serviceResult = vendorservice.addvendor(vendor);

            if (serviceResult.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok().build();
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Removes entry of publiher from the database using provided vendorDeleteDto")
    @DeleteMapping(value = "/api/deletevendor")
    public ResponseEntity delete(@RequestBody vendorDeleteDto vendor){
        try {
            ServiceResult result = vendorservice.deletevendor(vendor);

            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            ArrayList<vendor> res = (ArrayList<vendor>) vendorservice.getvendors();

            return ResponseEntity.ok(res);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @LogAnnotation
    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Updates entry of vendor in the database")
    @PutMapping(value = "/api/editvendor")
    public ResponseEntity editvendor(@RequestBody vendor vendor){
        try {
            ServiceResult result = vendorservice.editvendor(vendor);

            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok().build();
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns a list of vendors")
    @GetMapping(value = "api/get-vendors")
    public ResponseEntity getvendors() throws IOException {
        try {
            Iterable<vendor> vendors = vendorservice.getvendors();

            StringWriter writer = new StringWriter();
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(writer, vendors);

            return ResponseEntity.ok(writer.toString());
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Returns a vendor using provided id")
    @GetMapping(value = "/api/get-vendor-by-id")
    public ResponseEntity getvendorById(Long id){
        try {
            vendor vendor = vendorservice.getById(id);

            if (vendor == null) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok(vendor);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
