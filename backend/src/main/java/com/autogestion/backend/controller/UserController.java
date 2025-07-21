package com.autogestion.backend.controller;

import com.autogestion.backend.entity.User;
import com.autogestion.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{numberId}")
    public ResponseEntity<User> getUserByNumberId(@PathVariable String numberId) {
        return userService.getByNumberId(numberId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 