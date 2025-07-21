package com.autogestion.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usage")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Usage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "data_gb", nullable = false)
    private Integer dataGb;

    @Column(nullable = false)
    private Integer minutes;

    @Column(nullable = false)
    private Integer sms;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    public Usage() {}

    public Usage(Long id, User user, Integer dataGb, Integer minutes, Integer sms, LocalDateTime lastUpdated) {
        this.id = id;
        this.user = user;
        this.dataGb = dataGb;
        this.minutes = minutes;
        this.sms = sms;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Integer getDataGb() { return dataGb; }
    public void setDataGb(Integer dataGb) { this.dataGb = dataGb; }
    public Integer getMinutes() { return minutes; }
    public void setMinutes(Integer minutes) { this.minutes = minutes; }
    public Integer getSms() { return sms; }
    public void setSms(Integer sms) { this.sms = sms; }
    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    @Override
    public String toString() {
        return "Usage{" +
                "id=" + id +
                ", user=" + (user != null ? user.getId() : null) +
                ", dataGb=" + dataGb +
                ", minutes=" + minutes +
                ", sms=" + sms +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
} 