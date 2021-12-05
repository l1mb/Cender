package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    @Query(value = "exec FingOrdersByUserId :id", nativeQuery = true)
    Iterable<Order> findByUserId(long id);

    @Procedure(value = "UpdateOrder")
    Order update(Order mapped);

    @Procedure(value = "CompleteOrders")
    void completeOrders(Long id);

    @Query(value = "exec FindCompletedByUserID :userId", nativeQuery = true)
    Iterable<Order> findCompletedByUserId(Long userId);
}
