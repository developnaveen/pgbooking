package com.example.demo.auth.service;

import com.example.demo.auth.model.OtpDetails;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final ConcurrentHashMap<String, OtpDetails> otpStore = new ConcurrentHashMap<>();
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Autowired
    private JavaMailSender mailSender;

    // Generate OTP and send email
    public String generateOtp(String email) {

        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email not registered!");
        }
        String otp = String.format("%06d", new Random().nextInt(999999));
        Timestamp expiry = new Timestamp(System.currentTimeMillis() + 5 * 60 * 1000);
        otpStore.put(email, new OtpDetails(otp, expiry));

        sendOtpEmail(email, otp);
        return otp;
    }

    // Send OTP Email
    private void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp + "\nThis code will expire in 5 minutes.");

        mailSender.send(message);
        System.out.println("✅ OTP sent to " + toEmail);
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otp) {
        OtpDetails details = otpStore.get(email);

        if (details == null) return false;

        boolean isValid = details.getOtp().equals(otp) &&
                details.getExpiry().after(new Timestamp(System.currentTimeMillis()));

        if (isValid) {
            otpStore.remove(email);
        }

        return isValid;
    }
}
