package com.autogestion.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @Column(name = "number_id", nullable = false)
    private String numberId;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public User() {}

    public User(Long id, String accountNumber, String numberId, String phoneNumber, String name, String email, Plan plan, LocalDateTime createdAt) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.numberId = numberId;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
        this.plan = plan;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public String getNumberId() { return numberId; }
    public void setNumberId(String numberId) { this.numberId = numberId; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", accountNumber='" + accountNumber + '\'' +
                ", numberId='" + numberId + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", plan=" + (plan != null ? plan.getId() : null) +
                ", createdAt=" + createdAt +
                '}';
    }
} 