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
