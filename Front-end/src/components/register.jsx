import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, Container } from "@mui/material";
import axiosInstance from "../api/axiosInstance"; // Adjust the path as necessary

function RegistrationForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    dob: "",
    sex: "",
    occupation: "",
    home_address: "",
    alternative_mobile: "",
    govt_id_type: "",
    govt_id_number: "",
    profile_photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {  // ✅ Add async
  e.preventDefault();

  const data = {
    name: formData.name,
    contact: formData.contact,
    email: formData.email,
    dob: formData.dob,
    sex: formData.sex,
    occupation: formData.occupation,
    home_address: formData.home_address,
    alternative_mobile: formData.alternative_mobile,
    govt_id_type: formData.govt_id_type,
    govt_id_number: formData.govt_id_number,
    profile_photo: null,
    // profile_photo is not included here
  };
  console.log("Data to submit:", data);
  try {
    const response = await axiosInstance.post("/api/users", data, {   // ✅ Use await here
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Data to submit:", data);
    console.log("Server Response:", response.data);
    onClose();
    alert("Form submitted!");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit form.");
  }
};

  return (
    <Box
      component="section"
      sx={{
        py: 12,
        px: 3,
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 , color:'#F08080'}}>
          REGISTER
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            select
            fullWidth
            label="Sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Home Address"
            name="home_address"
            value={formData.home_address}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            label="Alternative Mobile"
            name="alternative_mobile"
            value={formData.alternative_mobile}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Government ID Type"
            name="govt_id_type"
            value={formData.govt_id_type}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Government ID Number"
            name="govt_id_number"
            value={formData.govt_id_number}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            component="label"
            sx={{ backgroundColor: "#CD5C5C", "&:hover": { backgroundColor: "#F08080" } }}
          >
            Upload Profile Photo
            <input type="file" name="profile_photo" hidden onChange={handleChange} />
          </Button>
          {formData.profile_photo && <Typography>{formData.profile_photo.name}</Typography>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#CD5C5C", "&:hover": { backgroundColor: "#F08080" } }}
          >
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default RegistrationForm;
