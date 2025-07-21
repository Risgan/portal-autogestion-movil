package com.autogestion.backend.repository;

import com.autogestion.backend.entity.Usage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsageRepository extends JpaRepository<Usage, Long> {
    Optional<Usage> findByUserId(Long userId);
} 