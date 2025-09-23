import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, ToggleButton, ToggleButtonGroup,
  Stack, Checkbox, FormControlLabel,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../context/UserContext.jsx";

export default function BookingPopup({ open, onClose, pgId, roomId }) {
  const { user } = useUser(); // always use logged-in user

  const [form, setForm] = useState({
    startDate: "",
    lastDate: "",
    agreementDoc: false,
    advance: false,
    rentAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleToggle = (name, value) => {
    if (name === "advance") setForm({ ...form, [name]: value === "yes" });
    if (name === "rentAmount") setForm({ ...form, [name]: value === "yes" ? 5000 : 0 });
  };

  const handleSubmit = async () => {
    if (!form.startDate || !form.lastDate) return alert("Start and End dates are required");
    if (!form.agreementDoc) return alert("You must agree to the terms to proceed!");
    if (!roomId) return alert("Room not selected");
    if (!user?.userId) return alert("No logged-in user found"); // ✅ use userId

    try {
      await axiosInstance.post("/api/bookings", {
        customerId: user.userId, // ✅ corrected from customerId
        pgId,
        roomId,
        startDate: form.startDate,
        lastDate: form.lastDate,
        bookingStatus: "Confirmed",
        agreementDoc: form.agreementDoc ? "Agreed" : null,
        advance: form.advance,
        rentAmount: form.rentAmount,
      });
      alert("Booking created successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving booking");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Booking</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField type="date" label="Start Date" name="startDate" InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField type="date" label="End Date" name="lastDate" InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <FormControlLabel control={<Checkbox name="agreementDoc" checked={form.agreementDoc} onChange={handleChange} />} label="I agree with all information and rules" />

        <Stack direction="row" spacing={2} alignItems="center">
          <span>Advance Payment:</span>
          <ToggleButtonGroup exclusive value={form.advance ? "yes" : "no"} onChange={(e, value) => value && handleToggle("advance", value)}>
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <span>Rent Payment:</span>
          <ToggleButtonGroup exclusive value={form.rentAmount > 0 ? "yes" : "no"} onChange={(e, value) => value && handleToggle("rentAmount", value)}>
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save Booking</Button>
      </DialogActions>
    </Dialog>
  );
}
