package com.example.demo.payment.service;

import com.example.demo.payment.dto.PaymentDto;
import com.example.demo.payment.model.Payment;
import com.example.demo.payment.repository.PaymentRepository;
import com.example.demo.booking.model.Booking;
import com.example.demo.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    private PaymentDto convertToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setPaymentId(payment.getPaymentId());
        dto.setBookingId(payment.getBookingId());
        dto.setCustomerId(payment.getCustomerId());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setTransMode(payment.getTransMode());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setAmount(payment.getAmount());
        dto.setPaymentPurpose(payment.getPaymentPurpose());
        dto.setTransactionId(payment.getTransactionId());
        dto.setCreatedAt(payment.getCreatedAt());
        dto.setUpdatedAt(payment.getUpdatedAt());
        return dto;
    }

    private Payment convertToEntity(PaymentDto dto) {
        Payment payment = new Payment();
        payment.setPaymentId(dto.getPaymentId());
        payment.setBookingId(dto.getBookingId());
        payment.setCustomerId(dto.getCustomerId());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setTransMode(dto.getTransMode());
        payment.setPaymentStatus(dto.getPaymentStatus());
        payment.setAmount(dto.getAmount());
        payment.setPaymentPurpose(dto.getPaymentPurpose());
        payment.setTransactionId(dto.getTransactionId());
        payment.setCreatedAt(dto.getCreatedAt());
        payment.setUpdatedAt(dto.getUpdatedAt());
        return payment;
    }

    public PaymentDto makePayment(PaymentDto dto) {
        Payment payment = convertToEntity(dto);
        Payment savedPayment = paymentRepository.save(payment);

        // ✅ Update booking if payment is successful
        if ("Success".equalsIgnoreCase(dto.getPaymentStatus())) {
            bookingRepository.findById(dto.getBookingId()).ifPresent(booking -> {
                booking.setPaymentStatus("Paid");
                booking.setBookingStatus("Confirmed");
                bookingRepository.save(booking);
            });
        }

        return convertToDto(savedPayment);
    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
