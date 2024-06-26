import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  getAllLocationsRequest,
  getLocationByIdRequest,
  postLocationRequest,
  putLocationRequest,
  deleteLocationRequest,
} from "../../api/locations/LocationRequests";
import { useAuth } from "../../auth/auth-context/AuthProvider";

const LocationsContext = createContext();

export function LocationsProvider({ children }) {
  const { userId } = useAuth();
  const [locations, setLocations] = useState([]);
  const [mapOrLocations, setMapOrLocations] = useState("map");
  const [mapCoords, setMapCoords] = useState([40.4637, -3.7492]);
  const [mapZoomLevel, setMapZoomLevel] = useState(5);
  const [locationCount, setLocationCount] = useState(0);

  function addLocationCount() {
    setLocationCount((prevCount) => prevCount + 1);
  }

  const getAllLocations = useCallback(async () => {
    let locations = await getAllLocationsRequest(userId);
    setLocations(locations);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getAllLocations();
    }
  }, [userId, getAllLocations]);

  async function getLocationById(locationId) {
    const location = await getLocationByIdRequest(userId, locationId);
    return location;
  }

  async function postLocation(location) {
    const newLocation = await postLocationRequest(userId, location);
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    await getAllLocations();
  }

  async function putLocation(locationId, location) {
    const updatedLocation = await putLocationRequest(
      userId,
      locationId,
      location
    );
    setLocations((prevLocations) =>
      prevLocations.map((l) => (l.id === locationId ? updatedLocation : l))
    );
  }

  async function deleteLocation(locationId) {
    await deleteLocationRequest(userId, locationId);
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== locationId)
    );
  }

  function handleMapOrLocationsChange(e, value) {
    if (value !== null) {
      setMapOrLocations(value);
    }
  }

  function handleChangeMapCoords(coords) {
    setMapCoords(coords);
  }

  function handleChangeMapZoomLevel(zoomLevel) {
    setMapZoomLevel(zoomLevel);
  }

  return (
    <LocationsContext.Provider
      value={{
        locations,
        setLocations,
        getAllLocations,
        getLocationById,
        postLocation,
        putLocation,
        deleteLocation,
        mapCoords,
        mapZoomLevel,
        handleChangeMapCoords,
        handleChangeMapZoomLevel,
        mapOrLocations,
        handleMapOrLocationsChange,
        locationCount,
        addLocationCount,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }
  return context;
}
