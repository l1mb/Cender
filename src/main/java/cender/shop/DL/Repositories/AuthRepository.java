package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Auth;
import org.springframework.data.repository.CrudRepository;

public interface AuthRepository extends CrudRepository<Auth, Long> {
    Auth getHashByUserId(Long id);


    Auth findByUserId(long id);
}
