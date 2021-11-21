package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {

    public default String returnMessage(){
        return "message";
    }
}
