package com.autogestion.backend.repository;

import com.autogestion.backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
} 