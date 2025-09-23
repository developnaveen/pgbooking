package com.example.demo.room.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @Column(nullable = false)
    private Integer pgId;  // FK to pg_details (can later make @ManyToOne)

    @Column(length = 50, nullable = false)
    private String roomNumber;

    @Column(precision = 10, scale = 2)
    private BigDecimal rent;

    private Boolean ac;
    private Boolean attachedToilet;

    @Column(length = 50)
    private String sharing;

    private Integer capacity;
    private Integer noAvailability;

    @Column(length = 50)
    private String size;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sex sex;

    @Lob
    private String roomPhoto;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;

    public enum Sex {
        Male, Female, Unisex
    }
}
