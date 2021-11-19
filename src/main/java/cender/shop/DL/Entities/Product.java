package cender.shop.DL.Entities;

import cender.shop.DL.Enums.GuitarType;
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
@Table(name="Products")
public class Product  {
    public String name;
    public String description;
    public GuitarType guitarType;
    public String previewImage;
    public int count;
    public Date creationDate;
    public double price;

    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
