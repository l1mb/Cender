package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;


public class OrderService {

    @Autowired
    private OrderRepository _orderRepo;


    public OrderService(){

    }

    public String returnMessage(){
        return _orderRepo.returnMessage();
    }


    public ServiceResult createOrder(BasicUserDto model) {
        return new ServiceResult(ServiceResultType.Success);
    }

    public ServiceResult updateExistingOrder(ExtendedOrderDto model) {

        return new ServiceResult(ServiceResultType.Success);
    }

    public ServiceResult deleteOrder(int[] id) {

        return new ServiceResult(ServiceResultType.Success);
    }

    public ServiceResult completeOrders() {

        return new ServiceResult(ServiceResultType.Success);
    }

    public List<ExtendedOrderDto> getCompletedOrders(){
        return new ArrayList<ExtendedOrderDto>();
    }
}
