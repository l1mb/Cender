package cender.shop.PL.DTO.User;

import javax.validation.constraints.Size;

public class BasicUserDto {
    @Size(min=0, max=25)
    public String email;
    @Size(min = 0, max = 25)
    public String username;
}
