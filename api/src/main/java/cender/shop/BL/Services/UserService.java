package cender.shop.BL.Services;

import cender.shop.BL.Utilities.Hasher;
import cender.shop.DL.Entities.Product;
import cender.shop.DL.Entities.User;
import cender.shop.DL.Repositories.ProductsRepository;
import cender.shop.DL.Repositories.UsersRepository;
import cender.shop.PL.dto.UserLoginDto;
import cender.shop.PL.dto.UserRegisterDto;
import cender.shop.PL.dto.productOrderInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ProductsRepository productsRepository;

    public ServiceResult login(UserLoginDto info){
        var user = usersRepository.getByLogin(info.login);

        if (user == null){
            return new ServiceResult(ServiceCode.BAD_REQUEST, "User doesn't exists");
        }

        if (!Hasher.isValid(info.password, Hasher.fromHex(user.getPassword()), user.getSalt())){
            return new ServiceResult(ServiceCode.BAD_REQUEST, "Password incorrect");
        }

        return new ServiceResult(ServiceCode.OK, "User authorized");
    }

    public ServiceResult register(UserRegisterDto info){
        var check = usersRepository.getByLogin(info.login);

        if (check != null){
            return new ServiceResult(ServiceCode.BAD_REQUEST, "Email already taken");
        }

        var user = new User();
        try{
            byte[] salt = Hasher.getSalt();
            byte[] hashedPassword = Hasher.getSaltedHash(info.password, salt);
            usersRepository.createUser(info.login, Hasher.toHex(hashedPassword), salt, info.name);
            return new ServiceResult(ServiceCode.CREATED, "User registered");
        } catch (NoSuchAlgorithmException e) {
            return new ServiceResult(ServiceCode.BAD_REQUEST, "Server error: " + e.getMessage());
        }
    }

    public ArrayList<productOrderInfoDto> getUserOrderproducts (Long orderId, Long userId){
        ArrayList<Integer> ids = (ArrayList<Integer>) usersRepository.getUserOrderproductsIds(orderId, userId);

        ArrayList<productOrderInfoDto> res = new ArrayList<>();

        for (int id : ids){
            var product = productsRepository.getProductById((long) id);
            res.add(new productOrderInfoDto(product.getTitle(), product.getVendor().getVendorName(),
                    product.getRating(), product.getPrice()));
        }

        return res;
    }

    public ServiceResult createOrder(Long userId, float total){
        try{
            usersRepository.createOrder(userId, total);
        } catch (Exception e){
            return new ServiceResult(ServiceCode.BAD_REQUEST, e.getMessage());
        }
        return new ServiceResult(ServiceCode.CREATED, "Success");
    }

    @Transactional
    public ServiceResult addproductsToOrder(int orderId, Product[] products){
        try{
            for (Product product : products) {
                usersRepository.addproductToOrder((long) orderId, product.getId());
            }
        } catch(Exception e){
            return new ServiceResult(ServiceCode.BAD_REQUEST, e.getMessage());
        }
        return new ServiceResult(ServiceCode.OK, "Success");
    }

    public User getUserByLogin(String login){return usersRepository.getByLogin(login);}

    public Integer getLastOrderId(Long userId){return usersRepository.getLastOrderId(userId);}

    public Iterable<Integer> getUserOrdersIds(Long userId){return usersRepository.getUserOrdersIds(userId);}

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return usersRepository.getByLogin(s);
    }
}
