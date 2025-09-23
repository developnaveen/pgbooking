package com.example.demo.room.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDTO {
    private Integer roomId;
    private Integer pgId;
    private String roomNumber;
    private BigDecimal rent;
    private Boolean ac;
    private Boolean attachedToilet;
    private String sharing;
    private Integer capacity;
    private Integer noAvailability;
    private String size;
    private String sex;
    private String roomPhoto;
}
