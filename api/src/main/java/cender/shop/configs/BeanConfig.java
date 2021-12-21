package cender.shop.configs;

import cender.shop.BL.Services.AuthService;
import cender.shop.BL.Services.OrderService;
import cender.shop.BL.Services.UserService;
import cender.shop.BL.Utilities.JwtFilter;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.PL.Controllers.AuthController;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@ComponentScan(basePackageClasses = {AuthController.class, OrderService.class} )
public class BeanConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public OrderService getOrderService() {
        return new OrderService();
    }

    @Bean
    public ModelMapper getModelMapper(){
        return new ModelMapper();
    }




    @Bean
    public JwtFilter getJwtFilter(){
        return new JwtFilter();
    }

}
