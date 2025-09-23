import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function AboutSection() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        marginTop: '50px',
        py: 12, // vertical padding
        px: 3, // horizontal padding
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          About PG Booking
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
          PG Booking is your go-to platform to find and book the perfect
          accommodations with ease. Whether you're a student, professional, or
          traveler, we make sure you have all the information and options at
          your fingertips. Our platform helps you explore, compare, and secure
          your stay quickly and reliably.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutSection;
