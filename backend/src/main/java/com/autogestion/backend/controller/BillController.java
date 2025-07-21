package com.autogestion.backend.controller;

import com.autogestion.backend.entity.Bill;
import com.autogestion.backend.service.BillService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/bills")
public class BillController {
    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getBillsByUserIdAndDateRange(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startdate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate enddate
    ) {
        if (startdate != null && enddate != null) {
            return ResponseEntity.ok(billService.getBillsByUserIdAndDateRange(userId, startdate, enddate));
        } else {
            return ResponseEntity.ok(billService.getBillsByUserId(userId));
        }
    }
} 