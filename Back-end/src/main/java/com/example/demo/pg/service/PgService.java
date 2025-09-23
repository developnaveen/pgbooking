package com.example.demo.pg.service;

import com.example.demo.pg.dto.PgDto;
import com.example.demo.pg.model.Pg;
import com.example.demo.pg.repository.PgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PgService {

    @Autowired
    private PgRepository pgDetailsRepository;

    // Convert Entity to DTO
    private PgDto toDTO(Pg pg) {
        return PgDto.builder()
                .pgId(pg.getPgId())
                .name(pg.getName())
                .ownerName(pg.getOwnerName())
                .contact(pg.getContact())
                .location(pg.getLocation())
                .address(pg.getAddress())
                .landmark(pg.getLandmark())
                .email(pg.getEmail())
                .website(pg.getWebsite())
                .totalRooms(pg.getTotalRooms())
                .acRooms(pg.getAcRooms())
                .nonAcRooms(pg.getNonAcRooms())
                .sex(pg.getSex().name())
                .noMaleRooms(pg.getNoMaleRooms())
                .noFemaleRooms(pg.getNoFemaleRooms())
                .sharingTypes(pg.getSharingTypes())
                .amenities(pg.getAmenities())
                .rules(pg.getRules())
                .photos(pg.getPhotos())
                .createdDate(pg.getCreatedDate())
                .updatedDate(pg.getUpdatedDate())
                .build();
    }

    // Convert DTO to Entity
    private Pg toEntity(PgDto dto) {
        return Pg.builder()
                .pgId(dto.getPgId())
                .name(dto.getName())
                .ownerName(dto.getOwnerName())
                .contact(dto.getContact())
                .location(dto.getLocation())
                .address(dto.getAddress())
                .landmark(dto.getLandmark())
                .email(dto.getEmail())
                .website(dto.getWebsite())
                .totalRooms(dto.getTotalRooms())
                .acRooms(dto.getAcRooms())
                .nonAcRooms(dto.getNonAcRooms())
                .sex(Pg.SexType.valueOf(dto.getSex()))
                .noMaleRooms(dto.getNoMaleRooms())
                .noFemaleRooms(dto.getNoFemaleRooms())
                .sharingTypes(dto.getSharingTypes())
                .amenities(dto.getAmenities())
                .rules(dto.getRules())
                .photos(dto.getPhotos())
                .createdDate(dto.getCreatedDate())
                .updatedDate(dto.getUpdatedDate())
                .build();
    }

    public List<PgDto> getAllPgDetails() {
        return pgDetailsRepository.findAll()
                .stream().map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PgDto getPgById(Integer id) {
        return pgDetailsRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public PgDto savePg(PgDto dto) {
        Pg saved = pgDetailsRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    public void deletePg(Integer id) {
        pgDetailsRepository.deleteById(id);
    }
}
