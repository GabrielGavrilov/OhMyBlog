package com.gabrielgavrilov.ohmyblog.core.blog.entity;

import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "blog")
@Getter
@Setter
@Accessors(chain = true)
public class Blog {

    @Id
    @Column(name = "blog_id")
    @Setter(AccessLevel.NONE)
    private UUID blogId;

    @Column(name = "user_id")
    @Setter(AccessLevel.NONE)
    private UUID userId;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "created_at")
    private Instant createdAt;

    @ManyToOne()
    @Setter(AccessLevel.NONE)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    public static Blog newInstance(UUID userId, String title, String body) {
        Blog blog = new Blog();
        blog.blogId = UUID.randomUUID();
        blog.userId = userId;
        blog.title = title;
        blog.body = body;
        blog.createdAt = Instant.now();
        return blog;
    }

}
