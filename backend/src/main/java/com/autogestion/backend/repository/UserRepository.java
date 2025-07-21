package com.autogestion.backend.repository;

import com.autogestion.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNumberId(String numberId);
} 