package cender.shop.DL.Entities;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity

public class Auth {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id()
    private Long id;

    public long userId;
    public String hash;

    public byte[] salt;

    public boolean emailConfirmed;

    public Date tokenExpirationDate;
    public String token;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Auth(int id, String hsh, byte[] salt){
        this.userId = id;
        this.hash = hsh;
        this.salt = salt;
        this.emailConfirmed = false;
        tokenExpirationDate = Date.from(LocalDate.now().plusDays(7).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Auth auth = (Auth) o;
        return id != null && Objects.equals(id, auth.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
