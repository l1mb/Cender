package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    @Query(value = "exec FindOrdersByUserId :id", nativeQuery = true)
    Iterable<Order> findByUserId(long id);

    @Procedure(value = "UpdateOrder")
    void update(int id ,
                int orders_count ,
                Date creation_date ,
                Date update_date );

    @Procedure(value = "CreateOrder")
    void createOrder(int product_id ,
                     int user_id ,
                     int orders_count ,
                     Date creation_date ,
                     Date update_date );

    @Procedure(value = "CompleteOrders")
    void completeOrders(Long id);

    @Procedure(value = "DeleteOrder")
    void deleteOrder(Long id);

    @Query(value = "exec FindCompletedByUserId :userId", nativeQuery = true)
    Iterable<Order> findCompletedByUserId(Long userId);
}
