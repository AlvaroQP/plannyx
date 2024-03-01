import React, { useState } from "react";
import styles from "./LocationList.module.css";
import { useLocations } from "../../../../context/locations/LocationsProvider";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import getLocationMarker from "../../../../utils/getLocationMarker";
import MapIcon from "@mui/icons-material/Map";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDivider from "../../../../components/ui/divider/CustomDivider";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

export default function LocationList() {
  const { t } = useTranslation();
  const {
    locations,
    handleMapOrLocationsChange,
    handleChangeMapCoords,
    handleChangeMapZoomLevel,
  } = useLocations();
  const [expandedItem, setExpandedItem] = useState(null);
  const itemsPerPage = 10;

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

  return (
    <div className={styles["locations-container"]}>
      <List>
        {locations.map((location, index) => (
          <div key={index}>
            <ListItem key={location.id} className={styles["list-item"]}>
              <Box
                display="flex"
                /* flexWrap="wrap" */
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
                      {expandedItem === index ? (
                        <Tooltip
                          title={t("locations.hide-description")}
                          placement="top"
                        >
                          <ExpandLess />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={t("locations.show-description")}
                          placement="top"
                        >
                          <ExpandMore />
                        </Tooltip>
                      )}
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
    </div>
  );
}
