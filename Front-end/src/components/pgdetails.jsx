import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Wifi,
  LocalParking,
  Restaurant,
  LocalLaundryService,
  Videocam,
  BatteryChargingFull,
} from "@mui/icons-material";
 
import axiosInstance from "../api/axiosInstance"; // Ensure baseURL is set to http://localhost:8080

export default function PgDetailsCard({ pgId }) {
  const [pg, setPg] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pgId) return; // guard

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/user/pg/${pgId}`); 
        const pgData = response.data;

        if (Array.isArray(pgData) && pgData.length > 0) {
          setPg(pgData[0]);
        } else {
          setPg(pgData);
        }
      } catch (error) {
        console.error("Error fetching PG:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pgId]);



  if (loading) return <Typography>Loading...</Typography>;
  if (!pg) return <Typography>No PG data available</Typography>;

  return (
    <Card sx={{ marginTop:4, padding: 4}}>
      {/* PG Name and Location */}
      <Typography variant="h5" fontWeight="bold">
        {pg.name}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        📍 {pg.location} | {pg.landmark}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <CardContent>
        <Grid container spacing={3}>
          {/* Left Side: Room Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Room Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={`Total Rooms: ${pg.totalRooms}`} />
               </ListItem>
              <ListItem>
                <ListItemText primary={`AC Rooms: ${pg.acRooms}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Non-AC Rooms: ${pg.nonAcRooms}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Male Rooms: ${pg.noMaleRooms}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Female Rooms: ${pg.noFemaleRooms}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`For: ${pg.sex}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Sharing Types: ${pg.sharingTypes}`} />
              </ListItem>
            </List>
          </Grid>

          {/* Right Side: Amenities and Rules */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={1}>
              <Grid item>
                <Chip icon={<Wifi />} label="Wi-Fi" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip icon={<LocalParking />} label="Parking" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip icon={<Restaurant />} label="Food" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip icon={<LocalLaundryService />} label="Laundry" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip icon={<Videocam />} label="CCTV" variant="outlined" />
              </Grid>
              <Grid item>
                <Chip icon={<BatteryChargingFull />} label="Power Backup" variant="outlined" />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Rules
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={pg.rules || "No rules specified"} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
