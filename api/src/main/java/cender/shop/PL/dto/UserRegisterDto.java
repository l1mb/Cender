package com.example.lab1.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserRegisterDto {
    @NotBlank
    @NotNull
    public String login;
    @NotBlank
    @NotNull
    public String password;

    @NotBlank
    @NotNull
    public String name;
}
