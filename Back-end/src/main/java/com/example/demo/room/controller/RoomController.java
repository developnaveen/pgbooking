package com.example.demo.room.controller;

import com.example.demo.room.dto.RoomDTO;
import com.example.demo.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public RoomDTO createRoom(@RequestBody RoomDTO dto) {
        return roomService.createRoom(dto);
    }

    @GetMapping
    public List<RoomDTO> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/pg/{pgId}")
    public List<RoomDTO> getRoomsByPgId(@PathVariable Integer pgId) {
        return roomService.getRoomsByPgId(pgId);
    }

    @PutMapping("/{id}")
    public RoomDTO updateRoom(@PathVariable Integer id, @RequestBody RoomDTO dto) {
        return roomService.updateRoom(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
    }
}
