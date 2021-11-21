package cender.shop.configs;

import cender.shop.BL.Services.AuthService;
import cender.shop.BL.Services.OrderService;
import cender.shop.DL.Repositories.AuthRepository;
import cender.shop.DL.Repositories.OrderRepository;
import cender.shop.PL.Controllers.AuthController;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = {AuthController.class, OrderService.class} )
public class BeanConfig {


    

    @Bean
    public AuthService getAuthService() {
        return new AuthService();
    }

    @Bean
    public OrderService getOrderService() {
        return new OrderService();
    }

    @Bean
    public ModelMapper getModelMapper(){
        return new ModelMapper();
    }

}
