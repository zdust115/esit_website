import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Polygon, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_KEY = "AIzaSyClLzs-RVQ_rfoxcBVnSXc8bqFkwM2zfn0";

const containerStyle = { width: '100%', height: '500px' };
const center = { lat: 39.2276, lng: 9.1086 }; // Parco di Terramaini

const polygonPath = [
  { lat: 39.2280, lng: 9.1075 },
  { lat: 39.2285, lng: 9.1090 },
  { lat: 39.2270, lng: 9.1095 },
  { lat: 39.2270, lng: 9.1075 },
];

export default function GoogleMapExample() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) {
      // Crea i marker avanzati
      const map = mapRef.current.state.map;

      const marker1 = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 39.2278, lng: 9.1080 },
        title: 'Ingresso principale',
      });

      const marker2 = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 39.2272, lng: 9.1090 },
        title: 'Area picnic',
      });

      // Salva i marker in un riferimento per eventuali operazioni future
      markersRef.current = [marker1, marker2];
    }
  }, [mapRef]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={(map) => (mapRef.current = { state: { map } })}
      >
        <Polygon
          paths={polygonPath}
          options={{
            fillColor: 'blue',
            fillOpacity: 0.2,
            strokeColor: 'blue',
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}