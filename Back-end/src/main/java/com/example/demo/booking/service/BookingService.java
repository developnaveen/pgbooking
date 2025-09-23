package com.example.demo.booking.service;

import com.example.demo.booking.dto.BookingDto;
import com.example.demo.booking.model.Booking;
import com.example.demo.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Convert Entity -> DTO
    private BookingDto convertToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setBookingId(booking.getBookingId());
        dto.setPgId(booking.getPgId());
        dto.setRoomId(booking.getRoomId());
        dto.setCustomerId(booking.getCustomerId());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setStartDate(booking.getStartDate());
        dto.setLastDate(booking.getLastDate());
        dto.setBookingStatus(booking.getBookingStatus());
        dto.setAgreementDoc(booking.getAgreementDoc());
        dto.setRentAmount(booking.getRentAmount());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());
        return dto;
    }

    // Convert DTO -> Entity
    private Booking convertToEntity(BookingDto dto) {
        Booking booking = new Booking();
        booking.setBookingId(dto.getBookingId());
        booking.setPgId(dto.getPgId());
        booking.setRoomId(dto.getRoomId());
        booking.setCustomerId(dto.getCustomerId());
        booking.setPaymentStatus(dto.getPaymentStatus());
        booking.setStartDate(dto.getStartDate());
        booking.setLastDate(dto.getLastDate());
        booking.setBookingStatus(dto.getBookingStatus());
        booking.setAgreementDoc(dto.getAgreementDoc());
        booking.setRentAmount(dto.getRentAmount());
        booking.setCreatedAt(dto.getCreatedAt());
        booking.setUpdatedAt(dto.getUpdatedAt());
        return booking;
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<BookingDto> getBookingById(Integer id) {
        return bookingRepository.findById(id).map(this::convertToDto);
    }

    public BookingDto createBooking(BookingDto dto) {
        Booking booking = convertToEntity(dto);
        return convertToDto(bookingRepository.save(booking));
    }

    public BookingDto updateBooking(Integer id, BookingDto dto) {
        return bookingRepository.findById(id).map(existing -> {
            Booking booking = convertToEntity(dto);
            booking.setBookingId(id);
            return convertToDto(bookingRepository.save(booking));
        }).orElse(null);
    }

    public void deleteBooking(Integer id) {
        bookingRepository.deleteById(id);
    }

    public List<BookingDto> getBookingsByUserId(Integer userId) {
        return bookingRepository.findByCustomerId(userId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
