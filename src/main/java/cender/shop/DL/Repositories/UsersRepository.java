package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UsersRepository  extends CrudRepository<User, Long> {

    User findByLogin(String Login);

    @Modifying
    @Transactional
    @Query(value = "insert into Users (login, password) values (:login, :password)", nativeQuery = true)
    void addNewUser(@Param("login") String login, @Param("password") String password);
}
