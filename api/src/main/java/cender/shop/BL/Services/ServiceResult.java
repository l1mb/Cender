package cender.shop.BL.Services;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ServiceResult {
    public ServiceCode id;
    public String message;

    public ServiceResult(ServiceCode id, String message){
        this.id = id;
        this.message = message;
    }
}
