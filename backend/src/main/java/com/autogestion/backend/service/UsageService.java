package com.autogestion.backend.service;

import com.autogestion.backend.entity.Usage;
import com.autogestion.backend.repository.UsageRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsageService {
    private final UsageRepository usageRepository;

    public UsageService(UsageRepository usageRepository) {
        this.usageRepository = usageRepository;
    }

    public Optional<Usage> getByUserId(Long userId) {
        return usageRepository.findByUserId(userId);
    }
} 