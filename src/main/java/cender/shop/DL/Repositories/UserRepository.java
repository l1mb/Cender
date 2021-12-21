package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Users.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Procedure(value = "GetUserByLogin", outputParameterName = "userok")
    User getByLogin(@Param("ln") String login);

    @Procedure("CreateUser")
    void createUser(String ln,
                    String fe,
                    String le,
                    String ue);

    @Procedure("UpdateUser")
    void updateUser(
            int number,
            String login ,
            String first_name ,
            String last_name ,
            String username ,
            Date registration_date
    );

}
