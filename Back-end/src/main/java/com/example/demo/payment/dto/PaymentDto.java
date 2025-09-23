package com.example.demo.payment.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Setter
@Getter

public class PaymentDto {
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
}
