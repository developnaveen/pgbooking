import React from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Drawer,
} from "@mui/material";

export default function Filter({ filters, onChange }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const locationOptions = ["Chennai", "Bangaluru", "Kochi", "Hydrabad", "Pune", "Mumbai", "Delhi", "Gurgaon", "Noida"];
  const sharingOptions = ["Single", "Double", "Triple", "Quadruple", "Quintuple"];
  const amenitiesOptions = ["TV", "Parking", "Washing Machine", "Food", "Wi-Fi"];

  const handleAmenityChange = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    let newAmenities = [...filters.amenities];
    if (checked) {
      newAmenities.push(name);
    } else {
      newAmenities = newAmenities.filter(a => a !== name);
    }
    onChange({ amenities: newAmenities });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
        <Button variant="outlined" onClick={toggleDrawer(true)}>
          Filter
        </Button>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} variant="temporary">
        {renderFilter()}
      </Drawer>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {renderFilter()}
      </Box>
    </Box>
  );

  function renderFilter() {
    return (
      <Box sx={{ width: { xs: 250, md: "80%" }, p: 3, bgcolor: "#f5f5f5", height: "100%", overflowY: "auto" }}>
        <Typography variant="h6">Filter</Typography>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Location</Typography>
        <Autocomplete
          disablePortal
          options={locationOptions}
          value={filters.location || null}
          onChange={(e, value) => onChange({ location: value || "" })}
          renderInput={(params) => <TextField {...params} label="City" />}
        />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Room Type</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filters.roomType === "AC Rooms"} />}
            label="AC Rooms"
            onChange={(e) => onChange({ roomType: e.target.checked ? "AC Rooms" : "" })}
          />
          <FormControlLabel
            control={<Checkbox checked={filters.roomType === "Non-AC Rooms"} />}
            label="Non-AC Rooms"
            onChange={(e) => onChange({ roomType: e.target.checked ? "Non-AC Rooms" : "" })}
          />
        </FormGroup>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Sex</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filters.sex === "Male"} />}
            label="Male"
            onChange={(e) => onChange({ sex: e.target.checked ? "Male" : "" })}
          />
          <FormControlLabel
            control={<Checkbox checked={filters.sex === "Female"} />}
            label="Female"
            onChange={(e) => onChange({ sex: e.target.checked ? "Female" : "" })}
          />
          <FormControlLabel
            control={<Checkbox checked={filters.sex === "Unisex"} />}
            label="Unisex"
            onChange={(e) => onChange({ sex: e.target.checked ? "Unisex" : "" })}
          />
        </FormGroup>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Sharing Type</Typography>
        <FormGroup row sx={{ flexWrap: { xs: "nowrap", md: "wrap" } }}>
          {sharingOptions.map((type) => (
            <FormControlLabel
              key={type}
              control={<Checkbox checked={filters.sharingType === type} />}
              label={type}
              onChange={(e) => onChange({ sharingType: e.target.checked ? type : "" })}
            />
          ))}
        </FormGroup>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Amenities</Typography>
        <FormGroup row sx={{ flexWrap: { xs: "nowrap", md: "wrap" } }}>
          {amenitiesOptions.map((amenity) => (
            <FormControlLabel
              key={amenity}
              control={<Checkbox checked={filters.amenities.includes(amenity)} />}
              label={amenity}
              name={amenity}
              onChange={handleAmenityChange}
            />
          ))}
        </FormGroup>
      </Box>
    );
  }
}
