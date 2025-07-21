package com.gabrielgavrilov.ohmyblog.core.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.UUID;

@Entity
@Table(name = "\"user\"")
@Getter
@Setter
@Accessors(chain = true)
public class User {

    @Id
    @Column(name = "user_id")
    @Setter(AccessLevel.NONE)
    private UUID userId;

    @Column(name = "email")
    private String email;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "description")
    private String description;

    @Column(name = "password")
    private String password;

    public static User newInstance(String email, String displayName, String password) {
        User user = new User();
        user.userId = UUID.randomUUID();
        user.email = email;
        user.displayName = displayName;
        user.password = password;
        return user;
    }

}
