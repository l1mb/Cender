package cender.shop.DL.Entities;

import cender.shop.DL.Enums.OrderStatus;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order  {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public int userId;
    public OrderStatus status;
    public Date createOrderDate;
    public Date updateOrderDate;
    public int productId;
    public int count;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Order order = (Order) o;
        return getId() != null && Objects.equals(getId(), order.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
