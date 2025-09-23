package com.example.demo.pg.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PgDto {
    private Integer pgId;
    private String name;
    private String ownerName;
    private String contact;
    private String location;
    private String address;
    private String landmark;
    private String email;
    private String website;
    private Integer totalRooms;
    private Integer acRooms;
    private Integer nonAcRooms;
    private String sex;
    private Integer noMaleRooms;
    private Integer noFemaleRooms;
    private String sharingTypes;
    private String amenities;
    private String rules;
    private String photos;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
