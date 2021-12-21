package cender.shop.DL.Entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.Collator;
import java.util.Comparator;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@JsonAutoDetect
@Entity
@Table(name="Products")
public class Product {

    public static final Comparator<Product> PRICE_ASCENDING_COMPARATOR = (o1, o2) -> (int) (o1.getPrice() - o2.getPrice());

    public static final Comparator<Product> PRICE_DESCENDING_COMPARATOR = (o1, o2) -> (int) (o2.getPrice() - o1.getPrice());

    public static final Comparator<Product> TITLE_ASCENDING_COMPARATOR = (o1, o2) -> Collator.getInstance().compare(o1.getTitle(), o2.getTitle());

    public static final Comparator<Product> TITLE_DESCENDING_COMPARATOR = (o1, o2) -> Collator.getInstance().compare(o2.getTitle(), o1.getTitle());

    @NotBlank
    @NotNull
    @Column(unique = true)
    private String title;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id")
    private Vendor vendor;

    @NotBlank
    @NotNull
    @Column(length = 4000)
    private String ProductDescription;

    @NotBlank
    @NotNull
    private String rating;

    @NotBlank
    @NotNull
    private float price;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Product(String title, Vendor vendor){
        this.title = title;
        this.vendor = vendor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Product product = (Product) o;
        return id != null && Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

