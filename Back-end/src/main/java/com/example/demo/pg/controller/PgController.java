package com.example.demo.pg.controller;

import com.example.demo.pg.dto.PgDto;
import com.example.demo.pg.service.PgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class PgController {

    @Autowired
    private PgService pgDetailsService;

    @GetMapping
    public List<PgDto> getAllPg() {
        return pgDetailsService.getAllPgDetails();
    }

    @GetMapping("/pg/{id}")
    public PgDto getPgById(@PathVariable Integer id) {
        return pgDetailsService.getPgById(id);
    }

    @PostMapping
    public PgDto createPg(@RequestBody PgDto dto) {
        return pgDetailsService.savePg(dto);
    }

    @PutMapping("/{id}")
    public PgDto updatePg(@PathVariable Integer id, @RequestBody PgDto dto) {
        dto.setPgId(id);
        return pgDetailsService.savePg(dto);
    }

    @DeleteMapping("/{id}")
    public String deletePg(@PathVariable Integer id) {
        pgDetailsService.deletePg(id);
        return "PG with id " + id + " deleted successfully!";
    }
}
