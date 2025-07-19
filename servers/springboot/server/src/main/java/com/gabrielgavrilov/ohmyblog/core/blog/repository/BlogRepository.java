package com.gabrielgavrilov.ohmyblog.core.blog.repository;

import com.gabrielgavrilov.ohmyblog.core.blog.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlogRepository extends JpaRepository<Blog, UUID> {
}
