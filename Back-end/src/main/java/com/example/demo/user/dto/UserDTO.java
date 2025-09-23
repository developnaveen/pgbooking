package com.example.demo.user.dto;  // ✅ Add this line at the top

import com.example.demo.user.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserDTO {

    private Long userId;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 15)
    private String contact;

    @Email
    private String email;

    private LocalDate dob;

    private User.Sex sex;

    @Size(max = 100)
    private String occupation;

    @JsonProperty("home_address")
    private String homeAddress;

    @Size(max = 15)
    @JsonProperty("alternative_mobile")
    private String alternativeMobile;

    @JsonProperty("govt_id_type")
    private String govtIdType;

    @JsonProperty("govt_id_number")
    @NotBlank(message = "Government ID Number is required")
    private String govtIdNumber;

    @JsonProperty("profile_photo")
    private String profilePhoto;

    private LocalDateTime createdDate;

    public UserDTO() {}

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.contact = user.getContact();
        this.email = user.getEmail();
        this.dob = user.getDob();
        this.sex = user.getSex();
        this.occupation = user.getOccupation();
        this.homeAddress = user.getHomeAddress();
        this.alternativeMobile = user.getAlternativeMobile();
        this.govtIdType = user.getGovtIdType();
        this.govtIdNumber = user.getGovtIdNumber();
        this.profilePhoto = user.getProfilePhoto();
        this.createdDate = user.getCreatedDate();
    }
}
