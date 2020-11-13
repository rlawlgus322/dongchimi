package com.bezkoder.springjwt.models;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    private String nickname;


    private int gender;

    private String profileimage;

    private float star =0f;

    private int num =0;

    private String prefer1;
    private String prefer2;
    private String prefer3;

    @CreationTimestamp
    private LocalDateTime create_at;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles = new HashSet<>();


    public User(String username, String email, String password,String nickname, int gender, String profileimage, float star, int num) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.profileimage = profileimage;
        this.star = star;
        this.num = num;

    }
    public User(String username, String email, String password,String nickname, int gender, String profileimage, float star, int num, String prefer1,String prefer2,String prefer3) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.profileimage = profileimage;
        this.star = star;
        this.num = num;
        this.prefer1 = prefer1;
        this.prefer2 = prefer2;
        this.prefer3 = prefer3;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", gender=" + gender +
                ", profileimage='" + profileimage + '\'' +
                ", star=" + star +
                ", num=" + num +
                ", prefer1='" + prefer1 + '\'' +
                ", prefer2='" + prefer2 + '\'' +
                ", prefer3='" + prefer3 + '\'' +
                ", create_at=" + create_at +

                '}';
    }
}
