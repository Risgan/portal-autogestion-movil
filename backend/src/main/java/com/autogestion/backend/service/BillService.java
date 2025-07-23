package com.autogestion.backend.service;

import com.autogestion.backend.entity.Bill;
import com.autogestion.backend.repository.BillRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public Bill getBillById(Long billId) {
        return billRepository.findById(billId).orElseThrow(() -> new RuntimeException("Factura no encontrada"));
    }

    public String generateBillTxt(Bill bill) {
        return "Factura ID: " + bill.getId() + "\n" +
                "Usuario: " + (bill.getUser() != null ? bill.getUser().getName() : "-") + "\n" +
                "Plan: " + (bill.getPlan() != null ? bill.getPlan().getName() : "-") + "\n" +
                "Periodo: " + bill.getPeriod() + "\n" +
                "Monto: $" + bill.getAmount() + " USD\n" +
                "Fecha de emisión: " + bill.getIssueDate() + "\n" +
                "Fecha de vencimiento: " + bill.getDueDate() + "\n";
    }

    public byte[] generateBillPdf(Bill bill) {
        // Simula PDF como texto plano, en real usarías una librería PDF
        String content = "Factura PDF\n" + generateBillTxt(bill);
        return content.getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }

    public byte[] generateBillJson(Bill bill) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(bill);
    }
} 