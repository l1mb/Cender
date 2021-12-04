package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Order;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.PL.DTO.Cart.BasicOrderDto;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;


public class OrderService {

    @Autowired
    private OrderRepository _orderRepo;


    @Autowired
    private ModelMapper _modelMapper;

    public OrderService(){

    }

    public String returnMessage(){
        return _orderRepo.returnMessage();
    }


    public ServiceResultP<Order> createOrder(BasicOrderDto model) {
        var mapped = _modelMapper.map(model, Order.class);
        var result = _orderRepo.save(mapped);
        return new ServiceResultP<>(ServiceResultType.Success, result);
    }

    public ServiceResultP<Order> updateExistingOrder(ExtendedOrderDto model) {
        var mapped = _modelMapper.map(model, Order.class);
        var existingOrder = _orderRepo.findById(mapped.getId()).get();
        existingOrder.count=mapped.count;
        var result =  _orderRepo.update(mapped);
        return new ServiceResultP<>(ServiceResultType.Success, result);
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

    public List<Order> getOrdersByUserId(int id) {
        // todo implement
        var orders = _orderRepo.findByUserId((long) id);
        return orders;
    }
    public Order getOrdersById(Long id) {
        var order = _orderRepo.findById(id);
        return order.get();
    }
}
