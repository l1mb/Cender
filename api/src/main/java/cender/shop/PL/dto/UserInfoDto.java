package cender.shop.PL.dto;

import cender.shop.DL.Entities.Role;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Set;

@Data
public class UserInfoDto {
    private String login;
    private String name;
    private Set<Role> roles;
}
