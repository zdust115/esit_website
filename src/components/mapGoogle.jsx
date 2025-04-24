import React from 'react';
import { GoogleMap, LoadScript, Polygon, InfoWindow, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_KEY = "AIzaSyClLzs-RVQ_rfoxcBVnSXc8bqFkwM2zfn0";

const containerStyle = {
  width: '90%',
  height: '500px',
  margin: 'auto',
  marginTop: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
}
const center = { lat: 39.246567, lng: 9.140266 }; // Parco di Terramainxi

export default function MapGoogle({ markers, areas }) {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_KEY}
      libraries={['maps']}
      version="beta"  >

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          disableDoubleClickZoom: true,
          mapTypeControl: false,
        }}
      >
        
        {areas.map(area => (
          <Polygon
            paths={area.path}
            title={area.name}
            key={area.id}
            options={{
              fillColor: 'blue',
              fillOpacity: 0.2,
              strokeColor: 'blue',
              strokeWeight: 2,
            }}
          />
        ))}

        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
          />
        ))}

      </GoogleMap>

    </LoadScript>
  );
}