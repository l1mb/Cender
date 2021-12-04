package cender.shop.DL.Repositories;

import cender.shop.DL.Entities.Auth;

public interface EmailRepository {
    Auth findByToken(String token) ;
}
