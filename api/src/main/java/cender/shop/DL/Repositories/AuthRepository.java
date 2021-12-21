package cender.shop.DL.Repositories;

import src.main.java.cender.shop.shop.DL.Entities.Auth;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface AuthRepository extends CrudRepository<Auth, Long> {
    @Query(value="exec FindHashByUserId (:id)", nativeQuery = true)
    Auth getHashByUserId(@Param("id") Long id);

    @Procedure("CreateAuth")
    void createAuth(int user_id ,
                    String hash ,
                    byte [] salt ,
                    Date token_expiration_date,
                    String token);

    @Procedure("UpdateAuth")
    void updateAuth(
            int id ,
            String  hash ,
            byte [] salt ,
            int email_is_confirmed

    );

    @Query(value = "exec FindAuthByUserId (:id)", nativeQuery = true)
    Auth findByUserId(@Param("id") long id);
    @Query(value = "exec FindAuthByUserToken (:token)", nativeQuery = true)
    Auth findByToken(@Param("token") String token);
}
