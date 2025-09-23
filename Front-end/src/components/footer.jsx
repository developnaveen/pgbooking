import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#CD5C5C', py: 4, px: 3, color: 'white' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="body1" sx={{ mb: { xs: 2, md: 0 } }}>
          © 2025 PG Booking. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Link href="#about" color="inherit" underline="hover">about</Link>
          <Link href="#service" color="inherit" underline="hover">Services</Link>
          <Link href="#contact" color="inherit" underline="hover">Contact</Link>
          <Link href="#home" color="inherit" underline="hover">Home</Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
