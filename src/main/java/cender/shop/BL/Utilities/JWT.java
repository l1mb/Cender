package cender.shop.BL.Utilities;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;


@Service
public class JWT {
    private static final String secretKet = "Secret key ahaahahah";

    public String generateToken(String login) {
        Date date = Date.from(LocalDate.now().plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return Jwts.builder()
                .setSubject(login)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, secretKet)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKet).parseClaimsJws(token);
            return true;
        } catch (Exception mjEx) {
        }
        return false;
    }

    public String getLoginFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKet).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
