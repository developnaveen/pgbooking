package com.example.demo.room.service;

import com.example.demo.room.dto.RoomDTO;
import com.example.demo.room.model.Room;
import com.example.demo.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomDTO createRoom(RoomDTO dto) {
        Room room = mapToEntity(dto);
        Room saved = roomRepository.save(room);
        return mapToDTO(saved);
    }

    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll()
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<RoomDTO> getRoomsByPgId(Integer pgId) {
        return roomRepository.findByPgId(pgId)
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public RoomDTO updateRoom(Integer id, RoomDTO dto) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found!"));
        room.setRoomNumber(dto.getRoomNumber());
        room.setRent(dto.getRent());
        room.setAc(dto.getAc());
        room.setAttachedToilet(dto.getAttachedToilet());
        room.setSharing(dto.getSharing());
        room.setCapacity(dto.getCapacity());
        room.setNoAvailability(dto.getNoAvailability());
        room.setSize(dto.getSize());
        room.setSex(Room.Sex.valueOf(dto.getSex()));
        room.setRoomPhoto(dto.getRoomPhoto());
        return mapToDTO(roomRepository.save(room));
    }

    public void deleteRoom(Integer id) {
        roomRepository.deleteById(id);
    }

    // mapping helpers
    private RoomDTO mapToDTO(Room room) {
        return RoomDTO.builder()
                .roomId(room.getRoomId())
                .pgId(room.getPgId())
                .roomNumber(room.getRoomNumber())
                .rent(room.getRent())
                .ac(room.getAc())
                .attachedToilet(room.getAttachedToilet())
                .sharing(room.getSharing())
                .capacity(room.getCapacity())
                .noAvailability(room.getNoAvailability())
                .size(room.getSize())
                .sex(room.getSex().name())
                .roomPhoto(room.getRoomPhoto())
                .build();
    }

    private Room mapToEntity(RoomDTO dto) {
        return Room.builder()
                .roomId(dto.getRoomId())
                .pgId(dto.getPgId())
                .roomNumber(dto.getRoomNumber())
                .rent(dto.getRent())
                .ac(dto.getAc())
                .attachedToilet(dto.getAttachedToilet())
                .sharing(dto.getSharing())
                .capacity(dto.getCapacity())
                .noAvailability(dto.getNoAvailability())
                .size(dto.getSize())
                .sex(Room.Sex.valueOf(dto.getSex()))
                .roomPhoto(dto.getRoomPhoto())
                .build();
    }
}
