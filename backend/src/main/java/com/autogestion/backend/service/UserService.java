package com.autogestion.backend.service;

import com.autogestion.backend.entity.User;
import com.autogestion.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getByNumberId(String numberId) {
        return userRepository.findByNumberId(numberId);
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }
} 