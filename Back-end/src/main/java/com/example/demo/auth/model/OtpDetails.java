package com.example.demo.auth.model;

import java.sql.Timestamp;

public class OtpDetails {
    private String otp;
    private Timestamp expiry;

    public OtpDetails(String otp, Timestamp expiry) {
        this.otp = otp;
        this.expiry = expiry;
    }

    public String getOtp() {
        return otp;
    }

    public Timestamp getExpiry() {
        return expiry;
    }
}
