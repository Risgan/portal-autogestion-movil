package com.autogestion.backend.controller;

import com.autogestion.backend.entity.Bill;
import com.autogestion.backend.service.BillService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {
    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping("users/{userId}")
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

    // Nuevo endpoint para descargar factura
    @GetMapping("{billId}/download")
    public ResponseEntity<byte[]> downloadBill(
            @PathVariable Long billId,
            @RequestParam(defaultValue = "json") String format
    ) throws Exception {
        Bill bill = billService.getBillById(billId);
        String filename = "factura_" + billId + "." + format;
        byte[] content;
        String contentType;
        if (format.equalsIgnoreCase("txt")) {
            content = billService.generateBillTxt(bill).getBytes(StandardCharsets.UTF_8);
            contentType = MediaType.TEXT_PLAIN_VALUE;
        } else {
            // JSON
            content = billService.generateBillJson(bill);
            contentType = MediaType.APPLICATION_JSON_VALUE;
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType(contentType))
                .body(content);
    }
} 