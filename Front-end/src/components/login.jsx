import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import axiosInstance from "../api/axiosInstance"; // Make sure baseURL points to http://localhost:8080
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

function LoginPage() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigate = useNavigate();

  // Send OTP
  const handleGetOtp = async () => {
    if (!email) {
      alert("Please enter your email first!");
      return;
    }

    setLoadingOtp(true);
    try {
      const response = await axiosInstance.post(
        "/auth/send-otp",
        { email },
        { timeout: 15000 } // 15s timeout in case server is slow
      );
      console.log("OTP Response:", response.data);
      setOtpSent(true);
      alert("OTP sent successfully! Please check your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.code === "ECONNABORTED") {
        alert("Request timed out. Please try again in a moment.");
      } else if (error.response) {
        alert(`Failed to send OTP: ${error.response.data.message || "Server error"}`);
      } else {
        alert("Failed to send OTP. Check your network connection.");
      }
      setOtpSent(false);
    } finally {
      setLoadingOtp(false);
    }
  };

  // Verify OTP
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!otp) {
    alert("Please enter the OTP!");
    return;
  }

  setLoadingLogin(true);
  try {
    const response = await axiosInstance.post("/auth/verify-otp", { email, otp });

    console.log("Verify Response:", response.data);

    if (response.data === "OTP verified successfully!") {
      // 🔑 Fetch full user by email
      const userResponse = await axiosInstance.get(`/api/users/email/${email}`);
      console.log("Fetched User:", userResponse.data);

      setUser(userResponse.data); // store full user object in context
      navigate("/booking");
    } else {
      alert("Invalid OTP, please try again.");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    if (error.code === "ECONNABORTED") {
      alert("Request timed out. Please try again.");
    } else if (error.response) {
      alert(`OTP verification failed: ${error.response.data.message || "Invalid OTP"}`);
    } else {
      alert("Failed to verify OTP. Check your network connection.");
    }
  } finally {
    setLoadingLogin(false);
  }
};


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setOtpSent(false);
    setOtp("");
  };

  return (
    <Box
      component="section"
      sx={{
        py: 12,
        px: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#F08080" }}>
          LOG IN
        </Typography>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Email + Get OTP */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              disabled={loadingOtp || loadingLogin}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#CD5C5C", "&:hover": { backgroundColor: "#F08080" } }}
              onClick={handleGetOtp}
              disabled={loadingOtp || loadingLogin || !email}
            >
              {loadingOtp ? "Sending..." : "Get OTP"}
            </Button>
          </Box>

          {/* OTP Field */}
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpSent || loadingLogin}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#CD5C5C", "&:hover": { backgroundColor: "#F08080" } }}
            disabled={loadingLogin || !otpSent}
          >
            {loadingLogin ? "Verifying..." : "Login"}
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default LoginPage;
