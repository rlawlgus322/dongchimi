package com.dcm.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userinfo")
public class User {

    @Id
    private String uid;

    private String id;
    private String name;
    private String nickname;
    private String address;
    private String gender;


    @Override
    public String toString() {
        return "User{" +
                "uid='" + uid + '\'' +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", address='" + address + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
