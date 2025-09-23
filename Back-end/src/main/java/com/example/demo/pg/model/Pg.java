package com.example.demo.pg.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pg_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pgId;

    @Column(length = 150, nullable = false)
    private String name;

    @Column(length = 100)
    private String ownerName;

    @Column(length = 15)
    private String contact;

    @Column(length = 255)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 255)
    private String landmark;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String website;

    private Integer totalRooms;
    private Integer acRooms;
    private Integer nonAcRooms;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private SexType sex;

    private Integer noMaleRooms;
    private Integer noFemaleRooms;

    @Column(length = 100)
    private String sharingTypes;

    @Column(columnDefinition = "TEXT")
    private String amenities;

    @Column(columnDefinition = "TEXT")
    private String rules;

    @Column(columnDefinition = "TEXT")
    private String photos;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public enum SexType {
        Male, Female, Unisex
    }
}
