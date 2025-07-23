package com.autogestion.backend.repository;

import com.autogestion.backend.entity.Usage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;

public interface UsageRepository extends JpaRepository<Usage, Long> {
    @Query("SELECT u FROM Usage u WHERE u.user.id = :userId ORDER BY u.lastUpdated DESC LIMIT 1")
    Optional<Usage> findLatestByUserId(@Param("userId") Long userId);

    @Query("SELECT u FROM Usage u WHERE u.user.id = :userId ORDER BY u.lastUpdated DESC")
    List<Usage> findAllByUserIdOrderByLastUpdatedDesc(@Param("userId") Long userId);
} 