package com.example.demo.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 15, nullable = false, unique = true)
    private String contact;

    @Column(length = 100, unique = true)
    private String email;

    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Sex sex;

    @Column(length = 100)
    private String occupation;

    @Column(columnDefinition = "TEXT")
    private String homeAddress;

    @Column(length = 15)
    private String alternativeMobile;

    @Column(length = 50)
    private String govtIdType;

    @Column(length = 50)
    private String govtIdNumber;

    @Column(length = 255)
    private String profilePhoto;

    private LocalDateTime createdDate = LocalDateTime.now();

    public enum Sex { Male, Female, Other }
}
