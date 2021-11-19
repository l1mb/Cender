package cender.shop.DL.Entities;

import cender.shop.DL.Enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Users")
public class Order  {
    public int userId;
    public OrderStatus status;
    public Date createOrderDate;
    public Date updateOrderDate;
    public int productId;
    public int count;
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
