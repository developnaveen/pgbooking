package com.example.demo.payment.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    private Integer bookingId;
    private Integer customerId;
    private LocalDateTime paymentDate;
    private String transMode;
    private String paymentStatus;
    private BigDecimal amount;
    private String paymentPurpose;
    private String transactionId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters & Setters
    // ...
}
