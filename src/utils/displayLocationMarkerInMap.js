import L from "leaflet";
import ReactDOMServer from "react-dom/server";
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

export default function displayLocationMarkerInMap(locationMarker) {
  let iconHtml = "";

  // Map location markers to their respective MUI icons and colors
  const iconConfigMap = {
    location: { icon: <LocationOnIcon />, color: "#2193ff" },
    home: { icon: <HomeIcon />, color: "#dd307b" },
    restaurant: { icon: <RestaurantIcon />, color: "#e8693e" },
    cafe: { icon: <LocalCafeIcon />, color: "#a56600" },
    storefront: { icon: <StorefrontIcon />, color: "#009682" },
    hotel: { icon: <HotelIcon />, color: "#955eed" },
    bus: { icon: <DirectionsBusIcon />, color: "#119e28" },
    hospital: { icon: <LocalHospitalIcon />, color: "#db2b2b" },
    parking: { icon: <LocalParkingIcon />, color: "#1976d2" },
    gasStation: { icon: <LocalGasStationIcon />, color: "#e0720b" },
  };

  // Get the appropriate icon component and color
  const { icon: iconComponent, color } = iconConfigMap[locationMarker];

  // Render the icon component into HTML
  if (iconComponent) {
    iconHtml = ReactDOMServer.renderToString(iconComponent);
  }

  // Convert HTML to data URL
  const iconUrl = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}">${iconHtml}</svg>`
  )}`;

  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -16],
  });
}
