package cender.shop.DL.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Auth(int id, String hsh){
        userId = id;
        hash = hsh;
    }
}
