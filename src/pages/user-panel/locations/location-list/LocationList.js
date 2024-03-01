import React, { useState, useEffect } from "react";
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

export default function LocationList() {
  const { locations } = useLocations();
  const [expandedItem, setExpandedItem] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  function handleExpandClick(index) {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
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
                      {expandedItem === index ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                  <IconButton>
                    <MapIcon sx={{ color: "#1976d2" }} />
                  </IconButton>
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
