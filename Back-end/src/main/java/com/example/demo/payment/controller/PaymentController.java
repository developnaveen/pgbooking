package com.example.demo.payment.controller;

import com.example.demo.payment.dto.PaymentDto;
import com.example.demo.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public PaymentDto makePayment(@RequestBody PaymentDto dto) {
        return paymentService.makePayment(dto);
    }

    @GetMapping
    public List<PaymentDto> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
