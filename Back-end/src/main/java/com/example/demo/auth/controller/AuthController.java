package com.example.demo.auth.controller;

import com.example.demo.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 1. Send OTP (generate + email)
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return "Email is required!";
        }

        authService.generateOtp(email);  // generate + send email
        return "OTP sent successfully to " + email;
    }

    // 2. Verify OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (email == null || otp == null) {
            return "Email and OTP are required!";
        }

        boolean isValid = authService.verifyOtp(email, otp);
        return isValid ? "OTP verified successfully!" : "Invalid or expired OTP!";
    }
}
