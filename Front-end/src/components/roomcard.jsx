import * as React from 'react';
import { useState } from 'react';
import BookingPopup from './bookingform';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import axiosInstance from '../api/axiosInstance';

export default function RoomCard({ pgId }) {
  const [rooms, setRooms] = React.useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // ✅ store clicked room

  const handleBookNow = (roomId) => {
    setSelectedRoomId(roomId);  // ✅ save which room was clicked
    setOpenBooking(true);       // open popup
  };

  const handleClosePopup = () => {
    setOpenBooking(false);
    setSelectedRoomId(null);    // clear selected room
  };

  React.useEffect(() => {
    if (!pgId) return;

    axiosInstance.get(`/rooms/pg/${pgId}`)
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, [pgId]);

  if (rooms.length === 0) {
    return <p>Loading room details...</p>;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {rooms.map((room) => (
        <Card
          key={room.roomId}
          sx={{ maxWidth: 350, margin: 2, border: '1px solid #ccc' }}
        >
          {/* Room Photo */}
          <CardMedia
            component="img"
            height="140"
            image= "/images/bed-4416515_1280.jpg" // Placeholder image if none
            alt="Room Photo"
          />

          {/* Room Number and Rent */}
          <CardContent sx={{ borderBottom: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Room Number: {room.roomNumber}</Typography>
              <Typography variant="subtitle1">Rent: ₹{room.rent}</Typography>
            </Box>
          </CardContent>

          {/* Room Details */}
          <CardContent sx={{ borderBottom: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">AC: {room.ac ? "Yes" : "No"}</Typography>
              <Typography variant="body2">Attached Bathroom: {room.attachedToilet ? "Yes" : "No"}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Sharing: {room.sharing}</Typography>
              <Typography variant="body2">Capacity: {room.capacity}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Availability: {room.noAvailability} left</Typography>
              <Typography variant="body2">Size: {room.size} sq.ft.</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Typography variant="body2">Sex: {room.sex}</Typography>
            </Box>
          </CardContent>

          {/* Book Now Button */}
          <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBookNow(room.roomId)}
            >
              Book Now
            </Button>
          </Stack>
        </Card>
      ))}

      {/* Booking Popup */}
      <BookingPopup
        open={openBooking}
        onClose={handleClosePopup}
        pgId={pgId}
        roomId={selectedRoomId} // ✅ pass the selected roomId
      />
    </Box>
  );
}
