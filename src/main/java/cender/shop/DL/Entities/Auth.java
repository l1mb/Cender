package cender.shop.DL.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

@Table(name="Auth")
public class Auth {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id()
    @Column(name = "id", nullable = false)
    private Long id;

    public long userId;
    public String hash;

    public String salt;

    public boolean emailConfirmed;

    public Date tokenExpirationDate;
    public String token;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Auth(int id, String hsh, String salt){
        this.userId = id;
        this.hash = hsh;
        this.salt = salt;
        this.emailConfirmed = false;
        tokenExpirationDate = Date.from(LocalDate.now().plusDays(7).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
