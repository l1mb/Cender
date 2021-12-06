package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Auth;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends CrudRepository<Auth, Long> {
    @Query(value="exec FindHashByUserId (:id)", nativeQuery = true)
    Auth getHashByUserId(@Param("id") Long id);

    @Procedure("CreateAuth")
    void createAuth(Auth auth);

    @Procedure("UpdateAuth")
    Auth updateAuth(Auth auth);

    @Query(value = "exec FindAuthByUserId (:id)", nativeQuery = true)
    Auth findByUserId(@Param("id") long id);
    @Query(value = "exec FindAuthByUserToken (:token)", nativeQuery = true)
    Auth findByToken(@Param("token") String token);
}
