package com.autogestion.backend.service;

import com.autogestion.backend.entity.Bill;
import com.autogestion.backend.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillService {
    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> getBillsByUserId(Long userId) {
        return billRepository.findByUserId(userId);
    }

    public List<Bill> getBillsByUserIdAndDateRange(Long userId, LocalDate start, LocalDate end) {
        return billRepository.findByUserIdAndIssueDateBetween(userId, start, end);
    }
} 