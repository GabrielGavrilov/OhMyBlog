package com.gabrielgavrilov.ohmyblog.core.blog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "created_at")
    private Instant createdAt;

    public static Blog newInstance(String title, String body) {
        Blog blog = new Blog();
        blog.blogId = UUID.randomUUID();
        blog.title = title;
        blog.body = body;
        blog.createdAt = Instant.now();
        return blog;
    }

}
