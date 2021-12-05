package cender.shop.DL.Repositories;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Users.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value = "exec GetUserByLogin :email", nativeQuery = true)
    User getByLogin(@Param("email") String login);

    @Procedure("CreateUser")
    User createUser(User user);

    @Procedure("UpdateUser")
    User updateUser(User user);

}
