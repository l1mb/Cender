package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Order;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.DL.Repositories.UserRepository;
import cender.shop.PL.DTO.Cart.BasicOrderDto;
import cender.shop.PL.DTO.Cart.ExtendedOrderDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;


public class OrderService {

    @Autowired
    private OrderRepository _orderRepo;


    @Autowired
    private ModelMapper _modelMapper;
    @Autowired
    private UserRepository _userRepo;

    public OrderService(){

    }



    public ServiceResultP<Order> createOrder(BasicOrderDto model) {
        var mapped = _modelMapper.map(model, Order.class);
        var result = _orderRepo.save(mapped);
        return new ServiceResultP<>(ServiceResultType.Success, result);
    }

    public ServiceResult updateExistingOrder(ExtendedOrderDto model) {
        var mapped = _modelMapper.map(model, Order.class);
        var existingOrder = _orderRepo.findById(mapped.getId()).get();
        existingOrder.count=mapped.count;
        _orderRepo.update(Math.toIntExact(existingOrder.getId()), existingOrder.count, existingOrder.createOrderDate, existingOrder.updateOrderDate);
        return new ServiceResult(ServiceResultType.Success);
    }

    public ServiceResult deleteOrder(Long[] id) {
        _orderRepo.deleteAllById(Arrays.asList(id));
        return new ServiceResult(ServiceResultType.Success);
    }

    public void completeOrders(String login) {
        var user = _userRepo.getByLogin(login);
        _orderRepo.completeOrders(user.getId());
    }

    public List<Order> getCompletedOrders(String login){
        var userId = _userRepo.getByLogin(login).getId();

        return (List<Order>) _orderRepo.findCompletedByUserId(userId);
    }

    public List<Order> getOrdersByUserId(int id) {
        // todo implement
        var orders = _orderRepo.findByUserId((long) id);
        return (List<Order>) orders;
    }
    public Order getOrdersById(Long id) {
        var order = _orderRepo.findById(id);
        return order.get();
    }
}