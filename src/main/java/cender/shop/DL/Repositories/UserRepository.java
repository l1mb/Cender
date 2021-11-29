package cender.shop.DL.Repositories;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Users.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value = "exec GetUserByEmail :email", nativeQuery = true)
    User getByEmail(@Param("email") String email);
}
