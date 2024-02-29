import React from "react";
import { RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function Markers({ marker, handleMarkerChange }) {
  return (
    <RadioGroup
      row
      aria-label="marker"
      name="marker"
      value={marker}
      onChange={handleMarkerChange}
      sx={{ mt: 2, mb: 2 }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        <FormControlLabel
          value="location"
          control={<Radio />}
          label={
            <LocationOnIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#2193ff" }}
            />
          }
        />
        <FormControlLabel
          value="home"
          control={<Radio />}
          label={
            <HomeIcon sx={{ fontSize: "1.75rem", mt: 0.7, color: "#dd307b" }} />
          }
        />
        <FormControlLabel
          value="restaurant"
          control={<Radio />}
          label={
            <RestaurantIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#e8693e" }}
            />
          }
        />
        <FormControlLabel
          value="cafe"
          control={<Radio />}
          label={
            <LocalCafeIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#a56600" }}
            />
          }
        />
        <FormControlLabel
          value="storefront"
          control={<Radio />}
          label={
            <StorefrontIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#009682" }}
            />
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mt: 1,
        }}
      >
        <FormControlLabel
          value="hotel"
          control={<Radio />}
          label={
            <HotelIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#955eed" }}
            />
          }
        />
        <FormControlLabel
          value="bus"
          control={<Radio />}
          label={
            <DirectionsBusIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#119e28" }}
            />
          }
        />
        <FormControlLabel
          value="hospital"
          control={<Radio />}
          label={
            <LocalHospitalIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#db2b2b" }}
            />
          }
        />
        <FormControlLabel
          value="parking"
          control={<Radio />}
          label={
            <LocalParkingIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#1976d2" }}
            />
          }
        />
        <FormControlLabel
          value="gasStation"
          control={<Radio />}
          label={
            <LocalGasStationIcon
              sx={{ fontSize: "1.75rem", mt: 0.7, color: "#e0720b" }}
            />
          }
        />
      </Box>
    </RadioGroup>
  );
}
