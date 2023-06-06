import React, { useEffect, useState } from 'react'
import axios from 'axios';
import mapboxAPI from './MapBoxApi';
import mapboxgl from 'mapbox-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css'; 
function Mapbox() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log('Current lattitude:', latitude);
        console.log('Current Longtitude:',longitude)

        // Save the latitude and longitude to the database
        // Add your database saving logic here
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );

    // Map setup and marker code
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg'; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude], // Use the retrieved latitude and longitude as the map center
      zoom: 9
    });

    // Add a marker for the current location
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }, [latitude, longitude]);
  return <div id="map-container" style={{ width: '100%', height: '400px' }} />;
};

export default Mapbox