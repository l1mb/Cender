package cender.shop.PL.controllers;

import cender.shop.BL.Services.ServiceCode;
import cender.shop.BL.Services.ServiceResult;
import cender.shop.BL.Services.VendorService;
import cender.shop.BL.aop.LogAnnotation;
import cender.shop.DL.Entities.Vendor;
import cender.shop.PL.dto.VendorDeleteDto;
import cender.shop.PL.dto.VendorDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.StringWriter;

@Controller
public class VendorController {

    @Autowired
    private VendorService vendorservice;

    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Creates new entry of vendor in the database using provided vendorDto")
    @PostMapping(value = "/api/addvendor")
    public ResponseEntity Addvendor(@RequestBody VendorDto vendor){
        try {
            ServiceResult serviceResult = vendorservice.addVendor(vendor);

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
    public ResponseEntity delete(@RequestBody VendorDeleteDto vendor){
        try {
            ServiceResult result = vendorservice.deleteVendor(vendor);

            if (result.id == ServiceCode.BAD_REQUEST) {
                return ResponseEntity.badRequest().build();
            }

            var res = vendorservice.getVendors();

            return ResponseEntity.ok(res);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @LogAnnotation
    @ApiResponse(code = 200,response = ResponseEntity.class, message = "OK")
    @Operation(description = "Updates entry of vendor in the database")
    @PutMapping(value = "/api/editvendor")
    public ResponseEntity editvendor(@RequestBody Vendor vendor){
        try {
            ServiceResult result = vendorservice.editVendor(vendor);

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
            Iterable<Vendor> vendors = vendorservice.getVendors();

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
            var vendor = vendorservice.getById(id);

            if (vendor == null) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.ok(vendor);
        } catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
