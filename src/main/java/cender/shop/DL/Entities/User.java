package cender.shop.DL.Entities;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;
import java.util.Date;

public class User extends BaseClass {
    @NotEmpty
    @NotBlank
    public String username;
    @NotEmpty
    @NotBlank
    public String firstName;
    public String lastName;
    @Email(message = "Email should be valid")
    public String email;
    public Date registrationDate;

    public Collection<Product> ownedProducts;
    public Collection<Order> shoppingCart;
}
