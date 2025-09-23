import * as React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function WelcomePage({ onGetStarted }) {
  return (
    <Box
      id="home"
      sx={{
        marginTop: "150px",
        padding: "100px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          Welcome to PG Booking
        </Typography>
        <Typography variant="h6" gutterBottom>
          Find and book your perfect stay with ease
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            color: "#f08080",
            backgroundColor: "white",
            ":hover": { color: "#F08080", background: "white" },
            borderRadius: "30px",
          }}
          onClick={onGetStarted} // <-- call handleOpen from Launcher
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
