// ServiceSection.jsx
import * as React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';  
import SupportAgentIcon from '@mui/icons-material/SupportAgent';  
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const services = [
  {
    icon: <BookOnlineIcon sx={{ fontSize: 50, color: '#CD5C5C' }} />,
    title: 'Easy Booking',
    description: 'Find and book your PG instantly with our user-friendly platform.',
  },
  {
    icon: <HomeIcon sx={{ fontSize: 50, color: '#CD5C5C' }} />,
    title: 'Verified Listings',
    description: 'All PGs are verified to ensure a safe and reliable stay.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: '#CD5C5C' }} />,
    title: '24/7 Support',
    description: 'We are here to help you anytime for any queries.',
  },
];

function ServiceSection() {
  const [selectedService, setSelectedService] = React.useState(null);

  return (
    <Box
      id="service"
      component="section"
      sx={{
        py: 12,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 6, color: 'white' }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
  {services.map((service, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          height: 200,
          width:350,           // fixed height for all cards
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardActionArea
          onClick={() => setSelectedService(index)}
          data-active={selectedService === index ? '' : undefined}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column', // must be column
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 2,
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selectedHover',
              },
            },
          }}
        >
          {service.icon}
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
            {service.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            {service.description}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  ))}
</Grid>

      </Container>
    </Box>
  );
}

export default ServiceSection;
