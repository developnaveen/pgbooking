import * as React from 'react';
import { Box, Card, CardContent, Avatar, Typography, Grid, Stack, Divider } from '@mui/material';
import { useUser } from '../context/UserContext.jsx';

export default function UserProfile() {
  const { user } = useUser(); // get the logged-in user directly

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Stack direction={{xs:"column", sm:"row"}} spacing={3} alignItems="center">
          <Avatar
            alt={user.name}
            src={user.profile_photo}
            sx={{ width: 120, height: 120 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            <Typography variant="body2" color="text.secondary">{user.contact}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Personal Details</Typography>
            <Typography variant="body1">{user.occupation}</Typography>
            <Typography>Date of Birth: {user.dob}</Typography>
            <Typography>Sex: {user.sex}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Contact / Address</Typography>
            <Typography>Home Address: {user.home_address}</Typography>
            <Typography>Alternative Mobile: {user.alternative_mobile}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Government ID</Typography>
            <Typography>ID Type: {user.govt_id_type}</Typography>
            <Typography>ID Number: {user.govt_id_number}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Account Info</Typography>
            <Typography>Created Date: {user.createdDate}</Typography>
            <Typography>User ID: {user.userId}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
