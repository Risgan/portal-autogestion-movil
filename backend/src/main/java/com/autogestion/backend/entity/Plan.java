package com.autogestion.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "plans")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(name = "data_gb", nullable = false)
    private Integer dataGb;

    @Column(nullable = false)
    private Integer minutes;

    @Column(nullable = false)
    private Integer sms;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Plan() {}

    public Plan(Long id, String name, Double price, Integer dataGb, Integer minutes, Integer sms, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.dataGb = dataGb;
        this.minutes = minutes;
        this.sms = sms;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getDataGb() { return dataGb; }
    public void setDataGb(Integer dataGb) { this.dataGb = dataGb; }
    public Integer getMinutes() { return minutes; }
    public void setMinutes(Integer minutes) { this.minutes = minutes; }
    public Integer getSms() { return sms; }
    public void setSms(Integer sms) { this.sms = sms; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return "Plan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", dataGb=" + dataGb +
                ", minutes=" + minutes +
                ", sms=" + sms +
                ", description='" + description + '\'' +
                '}';
    }
} 