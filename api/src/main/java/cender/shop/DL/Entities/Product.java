package com.example.lab1.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.Collator;
import java.util.Comparator;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect
@Entity
@Table(name="products")
public class product {

    public static final Comparator<product> PRICE_ASCENDING_COMPARATOR = (o1, o2) -> (int) (o1.getPrice() - o2.getPrice());

    public static final Comparator<product> PRICE_DESCENDING_COMPARATOR = (o1, o2) -> (int) (o2.getPrice() - o1.getPrice());

    public static final Comparator<product> TITLE_ASCENDING_COMPARATOR = (o1, o2) -> Collator.getInstance().compare(o1.getTitle(), o2.getTitle());

    public static final Comparator<product> TITLE_DESCENDING_COMPARATOR = (o1, o2) -> Collator.getInstance().compare(o2.getTitle(), o1.getTitle());

    @NotBlank
    @NotNull
    @Column(unique = true)
    private String title;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id")
    private vendor vendor;

    @NotBlank
    @NotNull
    @Column(length = 4000)
    private String productDescription;

    @NotBlank
    @NotNull
    private String rating;

    @NotBlank
    @NotNull
    private float price;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public product(String title, vendor vendor){
        this.title = title;
        this.vendor = vendor;
    }
}

