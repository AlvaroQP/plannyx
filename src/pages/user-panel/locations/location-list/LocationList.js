import React, { useState } from "react";
import styles from "./LocationList.module.css";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Box,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import getLocationMarker from "../../../../utils/getLocationMarker";
import MapIcon from "@mui/icons-material/Map";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDivider from "../../../../components/ui/divider/CustomDivider";
import { useTranslation } from "react-i18next";
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
import { useLocations } from "../../../../context/locations/LocationsProvider";

export default function LocationList() {
  const { t } = useTranslation();
  const {
    locations,
    handleMapOrLocationsChange,
    handleChangeMapCoords,
    handleChangeMapZoomLevel,
  } = useLocations();
  const [expandedItem, setExpandedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const itemsPerPage = 10;
  const filteredLocations =
    selectedFilter === "all"
      ? locations
      : locations.filter((location) => location.marker === selectedFilter);

  const paginatedLocations = filteredLocations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  function handleExpandClick(index) {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  }

  function handleMapIconClick(e) {
    handleMapOrLocationsChange(e, "map");
  }

  function handlePageChange(event, value) {
    setPage(value);
  }

  const handleFilterChange = (event, value) => {
    if (value !== null) {
      setSelectedFilter(value);
      setPage(1); // Reset page to 1 when filter changes
    }
  };

  return (
    <div className={styles["locations-container"]}>
      <ToggleButtonGroup
        value={selectedFilter}
        exclusive
        onChange={handleFilterChange}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <ToggleButton value="all">
          <strong>{t("locations.all")}</strong>
        </ToggleButton>
        <ToggleButton value="location">
          <LocationOnIcon sx={{ color: "#2193ff" }} />
        </ToggleButton>
        <ToggleButton value="home">
          <HomeIcon sx={{ color: "#dd307b" }} />
        </ToggleButton>
        <ToggleButton value="restaurant">
          <RestaurantIcon sx={{ color: "#e8693e" }} />
        </ToggleButton>
        <ToggleButton value="cafe">
          <LocalCafeIcon sx={{ color: "#a56600" }} />
        </ToggleButton>
        <ToggleButton value="storefront">
          <StorefrontIcon sx={{ color: "#009682" }} />
        </ToggleButton>
        <ToggleButton value="hotel">
          <HotelIcon sx={{ color: "#955eed" }} />
        </ToggleButton>
        <ToggleButton value="bus">
          <DirectionsBusIcon sx={{ color: "#119e28" }} />
        </ToggleButton>
        <ToggleButton value="hospital">
          <LocalHospitalIcon sx={{ color: "#db2b2b" }} />
        </ToggleButton>
        <ToggleButton value="parking">
          <LocalParkingIcon sx={{ color: "#1976d2" }} />
        </ToggleButton>
        <ToggleButton value="gasStation">
          <LocalGasStationIcon sx={{ color: "#e0720b" }} />
        </ToggleButton>
      </ToggleButtonGroup>

      <List>
        {paginatedLocations.map((location, index) => (
          <div key={index}>
            <ListItem key={location.id} className={styles["list-item"]}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box display="flex" flexDirection="column">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <ListItemIcon sx={{ ml: 1 }}>
                      {getLocationMarker(location.marker)}
                    </ListItemIcon>
                    <ListItemText primary={location.name} />
                  </Box>

                  {location.description !== "" && (
                    <Collapse
                      in={expandedItem === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box mt={1} />
                      <CustomDivider />
                      <ListItemText secondary={location.description} />
                    </Collapse>
                  )}
                </Box>
                <Box>
                  {location.description !== "" && (
                    <IconButton onClick={() => handleExpandClick(index)}>
                      {expandedItem === index ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                  <Tooltip title={t("locations.show-in-map")} placement="top">
                    <IconButton
                      onClick={() => {
                        handleMapIconClick();
                        handleChangeMapCoords([location.lat, location.lng]);
                        handleChangeMapZoomLevel(16);
                      }}
                    >
                      <MapIcon sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          </div>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className={styles.pagination}
      />
    </div>
  );
}
