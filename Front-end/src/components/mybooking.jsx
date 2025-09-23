import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../context/UserContext.jsx";

export default function BookingCard() {
  const { user } = useUser(); // get logged-in user from context
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/api/bookings/user/${user.userId}`);
        setBookings(response.data); // assuming an array of booking objects
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <>
      {bookings.map((booking) => (
        <Card key={booking.booking_id} sx={{ maxWidth: 400, margin: 2 }}>
          <CardContent>
            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Grid item>
                <CalendarTodayIcon color="action" />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <strong>From:</strong> {booking.startDate}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Grid item>
                <CalendarTodayIcon color="action" />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <strong>To:</strong> {booking.lastDate}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Grid item>
                <Typography variant="body2">
                  <strong>Status:</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={booking.bookingStatus}
                  color={booking.bookingStatus === "Confirmed" ? "success" : "default"}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AttachMoneyIcon color="action" />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <strong>Amount:</strong> ₹{booking.rentAmount}
                </Typography>
              </Grid>

              <Grid item>
                {booking.advance ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <strong>Advance:</strong> {booking.advance ? "Yes" : "No"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
