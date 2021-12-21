package com.example.lab1.dto;

import com.example.lab1.model.Role;
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
