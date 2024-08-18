// src/component/Map.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () => {
  const [vehiclePosition, setVehiclePosition] = useState(center);
  const [path, setPath] = useState([center]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch new vehicle position from API
      fetch('/api/vehicle-position')
        .then(response => response.json())
        .then(data => {
          setVehiclePosition(data);
          setPath(prevPath => [...prevPath, data]);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDb5NTtlOz0KJ9lfVFvTgI7BPBV1PUxaNA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={vehiclePosition}
        zoom={10}
      >
        <Marker position={vehiclePosition} />
        <Polyline path={path} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;