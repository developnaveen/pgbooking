package com.example.demo.booking.controller;

import com.example.demo.booking.dto.BookingDto;
import com.example.demo.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/bookings") // ✅ better to prefix with /api
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<BookingDto> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{userId}")
    public List<BookingDto> getBookingsByUserId(@PathVariable Integer userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Integer id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public BookingDto createBooking(@RequestBody BookingDto dto) {
        return bookingService.createBooking(dto);
    }

    @PutMapping("/{id}")
    public BookingDto updateBooking(@PathVariable Integer id, @RequestBody BookingDto dto) {
        return bookingService.updateBooking(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Integer id) {
        bookingService.deleteBooking(id);
        return "Booking deleted with id: " + id;
    }
}
