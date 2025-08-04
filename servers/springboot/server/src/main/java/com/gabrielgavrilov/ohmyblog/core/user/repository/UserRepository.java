package com.gabrielgavrilov.ohmyblog.core.user.repository;

import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
