import React, { useState, useEffect, useMemo } from "react";
import { Grid, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Header from "../components/header";
import Filter from "../components/filter";
import ActionAreaCard from "../components/pgcard";
import pgDetails from "../data/pgDetails"; // Import the axios-based function

// -------------------------
// TypeScript type for PG
// -------------------------
type PG = {
  pg_id: number;
  name: string;
  owner_name: string;
  contact: string;
  location: string;
  address: string;
  landmark: string;
  email: string;
  website: string;
  total_rooms: number;
  ac_rooms: number;
  non_ac_rooms: number;
  sex: string;
  no_male_rooms: number;
  no_female_rooms: number;
  sharing_types: string;
  amenities: string;
  rules: string;
  photos: string;
  created_date: string;
  updated_date: string;
};

// -------------------------
// BookingPage Component
// -------------------------
export default function BookingPage() {
  const [pgDetailsData, setPgDetailsData] = useState<PG[]>([]); // API data
  const [selectedRoom, setSelectedRoom] = useState<PG | null>(null);
  const [open, setOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    location: "",
    roomType: "",
    sex: "",
    sharingType: "",
    amenities: [] as string[],
  });

  // -------------------------
  // Handlers
  // -------------------------
  const handleViewDetails = (room: PG) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // -------------------------
  // Fetch PG details from API using axios
  // -------------------------
  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        const data = await pgDetails(); // Call the axios-based function
        setPgDetailsData(data);
      } catch (error) {
        console.error("Error fetching PG details:", error);
        setPgDetailsData([]); // fallback to empty array
      }
    };

    fetchPGDetails();
  }, []);

  // -------------------------
  // Filter PGs based on selected filters
  // -------------------------

  
  const filteredRooms = useMemo(() => {
    return pgDetailsData.filter((room) => {
      if (filters.location && room.location !== filters.location) return false;
      if (filters.roomType === "AC Rooms" && room.ac_rooms === 0) return false;
      if (filters.roomType === "Non-AC Rooms" && room.non_ac_rooms === 0) return false;
      if (filters.sex && room.sex !== filters.sex) return false;
      if (filters.sharingType && !room.sharing_types?.split(",").includes(filters.sharingType))
        return false;
      if (
        filters.amenities.length > 0 &&
        !filters.amenities?.every((a) => (room.amenities || "").split(",").includes(a))
      )
        return false;
      return true;
    });
  }, [filters, pgDetailsData]);

  // -------------------------
  // Render
  // -------------------------
  return (
    <>
      <Header />

      <Grid container spacing={2} sx={{ width: "100%", marginTop: "1rem" }}>
        {/* Filter sidebar */}
        <Grid item xs={12} md={3} sm={4}>
          <Filter filters={filters} onChange={handleFilterChange} />
        </Grid>

        {/* PG cards */}
        <Grid item xs={12} md={9} sm={8} container spacing={2}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.pg_id}>
              <ActionAreaCard room={room} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Dialog for room details */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRoom?.name}</DialogTitle>
        <DialogContent>
          <p>Owner: {selectedRoom?.owner_name}</p>
          <p>Location: {selectedRoom?.location}</p>
          <p>Total Rooms: {selectedRoom?.total_rooms}</p>
          <p>Amenities: {selectedRoom?.amenities}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
