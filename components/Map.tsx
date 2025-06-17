// w leaflet i  thought this would be more complicated to set up but it wasnt
"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Location {
  name: string;
  lat: number;
  lng: number;
  status: string;
}

interface MapProps {
  locations: Location[];
}

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


const getIconByStatus = (status: string) => {
  switch (status) {
    case 'very good':
    case 'good':
      return greenIcon;
    case 'moderate':
      return yellowIcon;
    case 'bad':
    case 'very bad':
      return redIcon;
    default:
      return greenIcon;
  }
};


export default function MapComponent({ locations }: MapProps) {
  const center: [number, number] = [38.86, -77.06];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '0.375rem'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} icon={getIconByStatus(location.status)}>
          <Popup>
            {location.name} <br /> <b>Status:</b> {location.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};