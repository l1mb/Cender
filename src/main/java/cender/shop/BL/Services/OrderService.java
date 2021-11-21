package cender.shop.BL.Services;

import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import cender.shop.PL.DTO.User.BasicUserDto;
import org.springframework.beans.factory.annotation.Autowired;

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
    }

    public ServiceResult updateExistingOrder(ExtendedOrderDto model) {
    }

    public ServiceResult deleteOrder(int[] id) {
    }

    public ServiceResult completeOrders() {
    }

    public List<ExtendedOrderDto> getCompletedOrders(){

    }
}
