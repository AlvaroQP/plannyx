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

export default function getLocationMarker(location) {
  if (location === "location") {
    return <LocationOnIcon sx={{ fontSize: "1.75rem", color: "#2193ff" }} />;
  } else if (location === "home") {
    return <HomeIcon sx={{ fontSize: "1.75rem", color: "#dd307b" }} />;
  } else if (location === "restaurant") {
    return <RestaurantIcon sx={{ fontSize: "1.75rem", color: "#e8693e" }} />;
  } else if (location === "cafe") {
    return <LocalCafeIcon sx={{ fontSize: "1.75rem", color: "#a56600" }} />;
  } else if (location === "storefront") {
    return <StorefrontIcon sx={{ fontSize: "1.75rem", color: "#009682" }} />;
  } else if (location === "hotel") {
    return <HotelIcon sx={{ fontSize: "1.75rem", color: "#955eed" }} />;
  } else if (location === "bus") {
    return <DirectionsBusIcon sx={{ fontSize: "1.75rem", color: "#119e28" }} />;
  } else if (location === "hospital") {
    return <LocalHospitalIcon sx={{ fontSize: "1.75rem", color: "#db2b2b" }} />;
  } else if (location === "parking") {
    return <LocalParkingIcon sx={{ fontSize: "1.75rem", color: "#1976d2" }} />;
  } else if (location === "gasStation") {
    return (
      <LocalGasStationIcon sx={{ fontSize: "1.75rem", color: "#e0720b" }} />
    );
  }
}
