import React, { createContext, useContext, useState, useCallback } from 'react';

const LocationContext = createContext();

export const useLocationContext = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [status, setStatus] = useState('idle'); // idle | requesting | granted | denied | error
  const [location, setLocation] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userLocation')) || null;
    } catch {
      return null;
    }
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.address || {};
          const nextLocation = {
            locality: address.suburb || address.neighbourhood || address.road || address.village || address.city_district || '',
            city: address.city || address.town || address.county || '',
            fullAddress: data.display_name || '',
            lat: latitude,
            lng: longitude,
          };
          setLocation(nextLocation);
          localStorage.setItem('userLocation', JSON.stringify(nextLocation));
          setStatus('granted');
        } catch (error) {
          console.error('Error reverse geocoding location:', error);
          setStatus('error');
        }
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ status, location, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
