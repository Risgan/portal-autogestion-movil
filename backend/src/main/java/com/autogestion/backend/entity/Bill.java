package com.autogestion.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @Column(nullable = false)
    private String period;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Bill() {}

    public Bill(Long id, User user, Plan plan, String period, Double amount, LocalDate dueDate, LocalDate issueDate, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.plan = plan;
        this.period = period;
        this.amount = amount;
        this.dueDate = dueDate;
        this.issueDate = issueDate;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : null) +
                ", plan=" + (plan != null ? plan.getId() : null) +
                ", period='" + period + '\'' +
                ", amount=" + amount +
                ", dueDate=" + dueDate +
                ", issueDate=" + issueDate +
                ", createdAt=" + createdAt +
                '}';
    }
} 