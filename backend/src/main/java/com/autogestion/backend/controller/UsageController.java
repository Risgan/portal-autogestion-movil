package com.autogestion.backend.controller;

import com.autogestion.backend.entity.Usage;
import com.autogestion.backend.service.UsageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}/usage")
public class UsageController {
    private final UsageService usageService;

    public UsageController(UsageService usageService) {
        this.usageService = usageService;
    }

    @GetMapping
    public ResponseEntity<Usage> getUsageByUserId(@PathVariable Long userId) {
        return usageService.getByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 