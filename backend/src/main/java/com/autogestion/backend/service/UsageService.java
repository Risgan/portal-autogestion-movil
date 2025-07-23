package com.autogestion.backend.service;

import com.autogestion.backend.entity.Usage;
import com.autogestion.backend.repository.UsageRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class UsageService {
    private final UsageRepository usageRepository;

    public UsageService(UsageRepository usageRepository) {
        this.usageRepository = usageRepository;
    }

    public Optional<Usage> getByUserId(Long userId) {
        return usageRepository.findLatestByUserId(userId);
    }

    public List<Usage> getAllByUserId(Long userId) {
        return usageRepository.findAllByUserIdOrderByLastUpdatedDesc(userId);
    }
} 