package com.autogestion.backend.repository;

import com.autogestion.backend.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUserIdAndIssueDateBetween(Long userId, java.time.LocalDate start, java.time.LocalDate end);
    List<Bill> findByUserId(Long userId);
} 