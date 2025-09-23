import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function ContactSection() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: 12,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'white' }}>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#CD5C5C', '&:hover': { backgroundColor: 'white', color:'#CD5C5C' } }}
            >
              Send Message
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'white' }}>
              <EmailIcon sx={{ color: '#CD5C5C' }} />
              <Typography>Email: contact@pgbooking.com</Typography>
              <PhoneIcon sx={{ color: '#CD5C5C' }} />
              <Typography>Phone: +91 9876543210</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
