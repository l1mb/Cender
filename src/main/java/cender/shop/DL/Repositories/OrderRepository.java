package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

     default String returnMessage(){
        return "message";
    }

    default List<Order> findByUserId(long id) {
        return null;
    }

    Order update(Order mapped);

    void completeOrders(Long id);

    List<Order> findCompletedByUserId(Long userId);
}
